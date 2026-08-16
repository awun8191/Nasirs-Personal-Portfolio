# AI Soiling Detection System for Solar Panels — Technical Case-Study Dossier

> **Purpose:** Technical brief for the portfolio designer. Every claim below is sourced from the repository at `/home/admin/PROJECTS/Ai-Soiling-Detection` (git log 2026-03-10 → 2026-07-27, 10 commits). Where a metric could not be found in the repo, the line reads **METRIC NOT FOUND - ASK OWNER**. Do not invent numbers beyond what is written here.
>
> **Source map (repo files backing this dossier):**
> - `README.md` — project overview, architecture, expected results
> - `CUSUM.md` — full Layer-1 diagnostic/redesign analysis and results
> - `imp_work/chapter3/Section_3.4_Hardware_Implementation.md` — hardware build, BEME
> - `imp_work/chapter3/Section_3.5_Software_and_Embedded_Development.md` — firmware, state machine, comms
> - `imp_work/chapter3/Section_3.6_Dataset_and_ML_Methodology.md` — dataset, features, ML, metrics
> - `imp_work/chapter3/Section_3.7_Design_Considerations.md` — power budget, sensor selection
> - `Results/*.json`, `Results/*.csv` — model params, CUSUM params, benchmark report
> - `MY WORK/Final Year Project Report.docx` + `extracted_report.txt` — thesis report (Chapters 1–3)
> - `MY WORK/DATA/` — CAD (`DESINGS.pdf`), circuit schematic + breadboard JPGs, prototype photo, demo video, BEME V2 spreadsheet
> - `RESEARCH/Sensor-Triggered AI System ... (1).pdf` — the project's own 18-page **proposal** (Dec 2025)

---

## 1. What the System Does

**Official title:** *Development of a Sensor-Triggered AI-Based Soiling Detection and Autonomous Cleaning System for Solar Panels* — an undergraduate Final-Year Project (B.Eng Electrical/Electronics) by Dauda Nasir Omotola (21/ENG04/011), Afe Babalola University, Ado Ekiti, Nigeria. Supervisor per proposal: Dr. Ayodeji Salau.

Soiling (dust, dirt, bird droppings accumulating on PV panels) silently reduces solar yield. The system detects soiling from **sensor data alone** (no cameras) using a two-layer "trigger-and-confirm" pipeline:

1. **Layer 1 — always-on trigger (Raspberry Pi Pico):** continuously computes a weighted **Composite Soiling Index (CSI)** from five environmental features and runs a one-sided **CUSUM control chart**. When the CSI shows a sustained downward shift, it raises an alarm.
2. **Layer 2 — on-demand confirmer (Raspberry Pi Zero 2 W):** normally **powered completely off**. Woken only on a Layer-1 alarm to run an **XGBoost classifier** that confirms "dirty" or rejects the alarm as a false positive.
3. **Autonomous cleaning:** if soiling is confirmed, the Pico drives a mechanical cleaning carriage (NEMA17 stepper + lead screws + DC-motor-driven paint roller brush) across the panel, then returns to home and sleeps.

Design context: off-grid, dust-prone (Nigerian Harmattan) deployments with strict energy budgets — the entire prototype is powered by a 20 W panel + 12 V 7.2 Ah lead-acid battery.

**Headline repo-sourced results:**
- Layer 1 event recall improved **29.4% → 87.3%** (3.0×) by replacing a single-signal CUSUM with the composite CSI
- Layer 2 XGBoost classification accuracy **99.98%** on Layer-1-triggered events (verified in repo against the actual model)
- Always-on monitoring power: **2.64 mW** (Pico dormant state; the "~3 mW" portfolio figure rounds this)
- Total prototype hardware cost (BEME): **₦273,750**

---

## 2. Full Technical Architecture

### 2.1 Two-layer pipeline (repo README diagram, verbatim structure)

```
 Environmental & performance sensors
                |
                v
 [ Layer 1 ]  Composite Soiling Index (CSI)
             + CUSUM control chart          (Raspberry Pi Pico, always on)
                |
          alarm fires?  ---- no ---> keep monitoring
                |
               yes
                v
 [ Layer 2 ]  XGBoost soiling classifier    (confirms or rejects the trigger)
                |
                v
        soiling confirmed -> cleaning action / alert
```

Layer 1 is a **trigger, not a classifier** — its job is recall (never miss an event; false alarms are cheap because Layer 2 filters them). Layer 2 is a **confirmer** — very high precision.

### 2.2 Sensing hardware (installed on the prototype)

| Sensor | Measures | Spec (from repo) | Interface |
|---|---|---|---|
| DHT22 (AM2302) | Ambient temperature + relative humidity | ±0.5 °C, ±2 % RH | Single-wire, 1 GPIO |
| DS18B20 ×2–3 | Panel surface / electronics / reference-cell temperature | ±0.5 °C, −55…+125 °C | OneWire bus, 1 GPIO, 64-bit ROM IDs |
| ACS712 (20 A variant) | Panel output current | 100 mV/A (3.3 V rail: 66 mV/A, ±3.5 %) | Analogue ADC (10-sample oversampled average) |
| PV reference cell (5 V, 50 mA) | Plane-of-array irradiance | Loaded with 100 Ω, 1 W resistor | Analogue ADC (voltage divider) |
| LDR ×2 | Binary daylight/night detection (night low-power trigger only — not used in the detection algorithm) | 10 kΩ divider | Analogue ADC |
| Voltage divider (100 kΩ / 22 kΩ, ≈4.545:1) | Panel voltage | Calibrated vs Fluke 117 DMM | Analogue ADC |
| 1.3" OLED 128×64, I²C | Real-time status display (V, I, irradiance, battery, cleaning state) | — | I²C |

Current-measurement resolution ≈ 10 mA. ACS712 output carries 2 kHz hall-sensor ripple, filtered by 10-sample software averaging (firmware, MicroPython `machine.ADC` 16-bit oversampled mode; effective ≈10 bits due to supply ripple).

### 2.3 Compute / microcontroller tier

| Role | Device | Spec (repo) | Power behaviour |
|---|---|---|---|
| Layer 1 controller | Raspberry Pi Pico (RP2040) | 264 KB SRAM, dual-core Cortex-M0+; MicroPython firmware | 3.3 V; ~30 mA active (≈90 mA at 133 MHz full load); <5 µA deep sleep; 0.8 mA dormant |
| Layer 2 inference | Raspberry Pi Zero 2 W | 512 MB RAM, quad-core Cortex-A53 @ 1 GHz | 5 V; ~350–450 mA active; **powered fully off when idle** (true zero-watt baseline) via IRLZ44N logic-level N-MOSFET gated by a Pico GPIO |

### 2.4 Firmware (MicroPython — note: no C code exists in the repo)

- **6-state finite state machine:** SLEEP → SENSE → TRIGGER → INFER → CLEAN → RETURN (defined in §3.5.1 of the thesis; power/current per state in §3 below).
- Duty-cycled sensing: RTC wake every **5–60 min (default 15 min)**; SENSE cycle ≈2 s round-robin polling (DS18B20 750 ms dominates; DHT22 ≈250 ms; ADC ≈10 µs).
- **CUSUM state persisted across deep sleep in RP2040 RTC backup registers** — no flash writes; sleep→wake transition ≈15 ms total.
- CSI computation: ~20 floating-point ops, <10 µs on the Pico; parameters stored in a JSON file <2 KB; persistent CUSUM state = 1 float.
- Sensor rail (3.3 V) gated by AO3400A MOSFET so sensors draw 0 current in SLEEP.
- Watchdog timer, 60 s timeout.
- Cleaning control: 5 stages (HOME → TRAVERSE → SCRUB → RETURN → PARK); open-loop step counting with limit-switch homing; stall detection via stepper back-EMF deviation >30 %; brush motor current cutoff >3 A; 300 s cleaning watchdog.

### 2.5 Communication stack (Pico ⇄ Pi Zero 2 W)

- **UART 115200 baud, 8N1**, Pico UART1 (GP4/GP5) ⇄ Pi Zero UART0 (GPIO14/15) via 3.3 V level shifter.
- Packet protocol: start flag `0xAA 0x55` (2 B) · packet type (1 B: `0x01` trigger, `0x02` data request, `0x03` data reply) · payload length (1 B) · payload (variable: sensor data, CSI value, config) · XOR checksum (1 B) · end flag `0x55 0xAA` (2 B).
- Trigger packet carries: current CSI, CUSUM statistic, 30-sample circular sensor buffer, RTC timestamp. No ACK within 500 ms → retransmit up to 3×, then communication fault → SLEEP.
- Pi Zero 2 W boot-to-inference ≈8–12 s; inference cycle 5–30 s.

### 2.6 ML pipeline

1. **Data:** HKUST solar-PV monitoring dataset (Li et al., 2025), 60 rooftop stations, Hong Kong, Jan 2021–Dec 2023, **46,293 station-days** (daily aggregation of 5-min inverter data + collocated meteorology).
2. **Preprocessing:** 2021 rainfall merged from Excel; timestamp standardisation; duplicate station-day rows mean-aggregated; records missing irradiance/rainfall dropped; <5 % missing → station-median imputation; >5 % → rows dropped.
3. **Chronological split (leakage prevention):** train = all days **before 2023-07-21** (≈37,000 station-days, ~75 %), test = **2023-07-21 onward** (≈9,260 station-days, ~25 %). All baselines, Cohen's d weights, CUSUM k/H, and XGBoost hyperparameters fit on training data only.
4. **Labels:** rainfall ≥5 mm/day **and** ≥6 h of measurable rain = cleaning event → label 0; after a cleaning event, 7–14 consecutive dry days → label 1 (dirty). Threshold calibrated on training data.
5. **Feature engineering (12 features, 10 ranked):** rolling 3-day mean/min humidity, temp_spread, daily irradiance (Wh/m²), mean/max temp, peak irradiance, temp_delta_approx, temperature-corrected performance ratio `pr_tc`, rolling efficiency deviation `rolling_eff_dev`. Humidity rolling features are deliberately cheap to compute on an MCU (fixed-size buffer).
6. **Layer 1 model:** weighted standardised composite index + one-sided lower CUSUM (see §4).
7. **Layer 2 model:** XGBoost `XGBClassifier`, 10 features, **200 trees** (model JSON confirms `num_trees: 200`), `binary:logistic`, trained on **Layer-1-triggered training events only** (mirrors embedded operation), exported as JSON (359 KiB). Hyperparameters (grid search + 5-fold CV, training data): `n_estimators=200, max_depth=7, learning_rate=0.1, subsample=0.8, colsample_bytree=0.8, min_child_weight=3, eval_metric=logloss`.
8. **Additional validation:** leave-one-station-out CV across the 60 stations — F1 varies <2 % across folds (repo claim).

### 2.7 CUSUM algorithm (Layer 1) — repo formulas

**Composite Soiling Index:**
```
CSI = ( Σⱼ sⱼ · wⱼ · zⱼ ) / ( Σⱼ wⱼ )      j = 1..5
zⱼ = (xⱼ − μⱼ) / σⱼ        # standardised feature (clean-day baselines from training data)
wⱼ = |Cohen's dⱼ|          # weight = discriminative power
sⱼ = sign(clean_mean − dirty_mean)   # empirical, from training data
```

**One-sided lower CUSUM on standardised CSI:**
```
Sᵢ = min(0, Sᵢ₋₁ + zᵢ + k)        zᵢ = (CSIᵢ − μ_CSI) / σ_CSI
alarm when Sᵢ < H   →   reset Sᵢ = 0
```

**Operating point (from `Results/cusum_params_composite.json`):** `k = 0.50`, `H = −0.30`, `μ_CSI = 0.0`, `σ_CSI = 0.743973`. Grid search: k ∈ {0.0…0.5}, H ∈ {0.0…−2.0}, selection criterion = highest test event recall among configs with training day-F1 ≥ 0.60.

**CSI features, baselines & weights (all training-data-only):**

| Feature | μ (clean) | σ (clean) | Sign | Weight (|Cohen's d|) |
|---|---:|---:|:---:|---:|
| rolling_3d_mean_humidity | 84.241 | 10.330 | +1 | 1.152 |
| rolling_3d_min_humidity | 59.254 | 17.671 | +1 | 0.837 |
| temp_spread | 3.762 | 1.861 | −1 | 0.766 |
| daily_irr_whm2 | 196,884 | 125,327 | −1 | 0.513 |
| mean_temp_c | 23.395 | 5.215 | +1 | 0.251 |

Physical story: dirty conditions in Hong Kong = dry season — lower humidity, larger diurnal temperature spread, clearer skies (higher irradiance), cooler temperatures. Humidity is **26× more discriminative** than the old single signal (`rolling_eff_dev`, Cohen's d = 0.045 vs 1.152).

**Performance-aware variant (CUSUM.md §6):** Layer 1 retargeted to also include direct PV-performance evidence (`rolling_eff_dev`, `pr_tc`) → event recall 97.22 % at FPR 69.07 %; a 3-of-5 rolling persistence gate (k=0.15, H=−0.40) recovers to 93.60 % recall at 60.72 % FPR. A 2-of-3 gate is flagged as the better practical trade-off (93.27 % recall, F1 0.6340, delay 0.1426 days). **Note:** the `cusum_params_performance_aware*.json` artifacts are referenced in docs but not present in the current working tree — **ASK OWNER** for the JSONs if needed.

### 2.8 Cleaning actuation (hardware)

- **Linear drive:** NEMA17 stepper 42HB34F08AB (0.4 N·m, 1.8°, 1.5 A/phase) + TMC2208 driver (1/16 microstep, StealthChop2), dual T8×8 lead screws synchronised by timing belt/pulley, KP08 pillow blocks, 8 mm linear rods + LM8UU bearings.
- **Brush:** JGA25-370 geared DC motor (12 V, 300 RPM no-load) + 200 mm synthetic paint-roller brush, L298N H-bridge (PWM 1 kHz, 80 % duty normal / 100 % heavy soiling).
- **Travel:** 60 RPM traverse ≈120 s across a 1.6 m panel (≈120–180 s full cycle; prototype panel is a 100 W polycrystalline, ~670×540 mm, chassis ~900×600 mm, assembled size ~950×650×150 mm, ≈8.5 kg).
- **Safety:** limit-switch homing + over-travel stops, back-EMF stall detection, 3 A brush-current emergency stop, 300 s watchdog.

---

## 3. Hardware Considerations & Power Budget

### 3.1 Power architecture

20 W polycrystalline panel → 30 A PWM charge controller → **12 V 7.2 Ah sealed lead-acid battery** (absorption 14.4 V / float 13.6 V) → XL4015 buck (12 V→5 V, 5 A: Pi Zero 2 W, L298N logic, ACS712, DHT22) and LM2596 buck (12 V→3.3 V, 3 A: Pico, DS18B20, LDRs). Both bucks 85–92 % efficient. 5 A blade fuse on the 12 V bus. BEME cost for power subsystem: ₦46,000 (16.8 % of total).

### 3.2 Power budget (thesis §3.7.2, Table 3.X — full table in repo)

| State / component | V | mA | Power | Duty | Daily energy |
|---|---|---:|---:|---:|---:|
| **Continuous monitoring:** Pico dormant | 3.3 | 0.8 | **2.64 mW** | 95.8 % | 60.7 mWh |
| **Sensing:** Pico active | 3.3 | 25.0 | 82.5 mW | 0.22 % | 4.36 mWh |
| DHT22 measuring | 3.3 | 1.5 | 4.95 mW | 0.005 % | 0.006 mWh |
| DS18B20 ×2 measuring | 3.3 | 2.0 | 6.60 mW | 0.005 % | 0.008 mWh |
| ACS712 active | 5.0 | 10.0 | 50 mW | 0.005 % | 0.06 mWh |
| **Inference:** Pi Zero 2W (idle+inferring) | 5.0 | 450 | 2250 mW | 0.035 % | 37.5 mWh |
| **Cleaning:** NEMA17 stepper | 12 | 350 | 4200 mW | 0.14 % | 80.0 mWh |
| JGA25-370 DC motor | 12 | 150 | 1800 mW | 0.14 % | 34.3 mWh |
| **Total average daily** | | | | | **217.0 mWh** |

**The "3 mW always-on" claim — verification:** the repo does **not** contain the literal phrase "3 mW". The documented always-on monitoring figure is **2.64 mW** (Pico dormant: 0.8 mA @ 3.3 V, §3.7.2). "3 mW" is a fair rounding of that value. (Note: §3.5.1 quotes <5 µA Pico deep-sleep current, which would be ~0.017 mW — the 2.64 mW dormant figure is the conservative, design-budget number.)

**Energy math (repo):** battery 86.4 Wh total / 43.2 Wh usable at 50 % DoD → **~199 days autonomy** at 217 mWh/day. 20 W panel ≈100 Wh/day harvest (≈5 peak-sun-hours) → **~460× daily margin**; still self-sufficient even at 1 % panel output on overcast days. Event-triggered design vs continuous inference: ~2.25 W × 24 h ≈ 54,000 mWh/day vs 217 mWh/day → **~250× reduction**; inference active <0.035 % of the day (**~99.6 % energy saved** vs always-on inference). Per false alarm: one inference cycle ≈0.5–3.0 mAh.

**State machine power figures (thesis §3.5.1):** SLEEP ≈5 µA (5–60 min); SENSE ≈30 mA (~2 s); TRIGGER ≈30 mA (~10 ms); INFER ≈430 mA (5–30 s); CLEAN ≈1–3 A (60–180 s); RETURN ≈500 mA (10–30 s).

**On-device measured figures: METRIC NOT FOUND - ASK OWNER** (benchmarks were run on x86_64 host and ARM-emulated Docker; ARM Pi Zero numbers were written to `/tmp`, not committed).

### 3.3 Hardware assets in the repo (usable for the web page)

- `MY WORK/DATA/Circuit Design Schematic.jpg` and `Circuit Design Breadboard View.jpg`
- `MY WORK/DATA/DESINGS.pdf` (7-page CAD drawings; image-only — captions in §3.4.1 note dimensions were inferred from BOM, **verify before publishing**)
- `MY WORK/DATA/IMG-20260306-WA0008.jpg` (prototype photo), `VID-20260306-WA0009.mp4` (demo video)
- `MY WORK/DATA/AI SOLAR CLEANER BEME V2.xlsx` (Bill of Engineering Measurements — 37 line items, ₦273,750 total)

---

## 4. ML Model Details

### 4.1 XGBoost confirmer (Layer 2)

- Model: gradient-boosted tree classifier, 200 trees, 10 features (see §2.6), `binary:logistic`, exported JSON (359 KiB) for embedded deployment (Treelite-class runtimes noted as the deployment path).
- Two exported variants: `Results/soiling_model_pi.json` (mean/min humidity feature set) and `Results/soiling_model_pi_humidity_roll3.json` (rolling_3d humidity set — the primary one).
- Feature importance (by gain): rolling humidity features + temp_spread dominate (thesis §3.6, Fig 3.7).

### 4.2 Reported performance (all values as found; source in brackets)

| Metric | Value | Source |
|---|---|---|
| Classification accuracy (Layer-1-triggered test events) | **99.98 %** | Thesis §3.6 Table 3.5; README; `verify_metrics.py` confirms "XGBoost metrics match actual model output" |
| Precision | 0.998 | Thesis §3.6 Table 3.5 |
| Recall | 0.999 | Thesis §3.6 Table 3.5 |
| F1 score | 0.912 | Thesis §3.6 Table 3.5 (with caveat in §3.6 cross-check: "obtained from the benchmark runs on the triggered event subset; verify if model retrained") |
| Full-chronological-test accuracy (all ~9,259 test days, not just triggered) | 0.73 (73 %) | `humidity_roll3_training.ipynb` cell output — **note the nuance**: the 99.98 % figure is on the Layer-1-triggered subset; the full-test-set evaluation in the notebook shows 73 %. Decide with owner which framing to publish. |

**Confusion matrix (TN/FP/FN/TP) for the 99.98 % figure: METRIC NOT FOUND - ASK OWNER** (script computes it but the committed outputs don't include the matrix).

### 4.3 Layer 1 CUSUM results (held-out test set, from `CUSUM.md` §5 + `cusum_params_composite.json`)

| Metric | Original single-signal (`rolling_eff_dev`) | Composite CSI | Improvement |
|---|---:|---:|:---:|
| Event recall | 29.4 % (349/1188) | **87.3 %** (1037/1188) | 3.0× |
| Day-level precision | ~41 % | **53.2 %** | 1.3× |
| Day-level recall | ~13 % | **78.4 %** | 6.0× |
| Day-level F1 | ~19.8 % | **63.4 %** | 3.2× |
| False alarm rate | 12.4 % | 49.0 % | trade-off |
| Signal separation (Cohen's d) | 0.045 | 1.123 train / **0.846 test** | ~25× |

Training data (grid-search JSON): event recall 0.6612, FPR 0.2354, day F1 0.6350. Alternative operating points: k=0.50/H=−0.50 → 80.9 % recall, 40.0 % FPR, F1 0.637 (best F1); k=0.10/H=−0.75 → 88.5 % recall, 55.1 % FPR (max recall).

**Performance-aware variant (§6 of CUSUM.md):** raw 97.22 % recall / 69.07 % FPR / F1 0.6267 / mean detection delay 0.0771 days; suppressed (3-of-5, k=0.15, H=−0.40): 93.60 % recall / 60.72 % FPR / F1 0.6244 / delay 0.2050 days; practical alternative 2-of-3: 93.27 % / 60.81 % / 0.6340 / 0.1426 days.

### 4.4 Known limitations (repo-stated, good honest-design material)

- 33.8 % of soiling events last only 1 day; 55.4 % ≤2 days — CUSUM structurally struggles with single-day events.
- Global (fleet-wide) normalisation biases extreme microclimates; per-station calibration is future work.
- Cohen's d weighting is a heuristic (not statistically optimal inverse-variance weighting).
- Model trained on subtropical Hong Kong data; Nigerian transferability not empirically validated (requires recalibration of label thresholds).

---

## 5. The Academic Paper

**No published academic paper exists in the repo.** Closest artifacts (both by the owner):

1. **Project proposal** — `RESEARCH/Sensor-Triggered AI System for Intelligent Solar Panel Soiling [Autosaved] (1).pdf`, 18 pages, Dec 2025, "PROJECT PROPOSAL PRESENTED TO THE DEPARTMENT OF ELECTRICAL, ELECTRONICS ENGINEERING, AFE BABALOLA UNIVERSITY". Structure (from PDF): Introduction (PV soiling losses 30–40 % severe / 0.2–2 % daily typical; event-triggered ML cuts energy 80–95 % vs continuous) → Problem Statement → Aim & Objectives → Scope → Related Works → Proposed Research Methodology → Required Resources (BEME) → Expected Contribution to Knowledge → References. **No abstract/results tables** — it's a proposal, pre-results.
2. **Final Year Project Report** — `MY WORK/Final Year Project Report.docx` (also `extracted_report.txt`): full thesis draft (Declaration, Chapters 1–3 written; Chapters 3.4–3.7 provided separately as polished markdown/PDF in `imp_work/chapter3/`; Chapter 4 results pending in the docx — ToC lists it but content not present in the extracted text).
3. `imp_work/chapter3/*.pdf` — PDF renderings of the four thesis methodology sections (3.4 Hardware Implementation, 3.5 Software & Embedded Development, 3.6 Dataset & ML Methodology, 3.7 Design Considerations).

`RESEARCH/` (11 PDFs) is the **literature base** — papers by other authors (Kaya 2025, Meng 2024, Nassreddine 2025, Percarpio & Ezzat 2024, Ahmed 2025, Cordero 2018, Reis 2026, Li et al. 2025 dataset paper, etc.). The 99.98 % figure appearing in the literature (Nassreddine et al. 2025, PV fault classification) is a *different* study cited for context — the project's own 99.98 % is independently measured on the Layer-1-triggered subset (verified by `verify_metrics.py`).

**Publication status / external links (arXiv, journal, conference): METRIC NOT FOUND - ASK OWNER.**

---

## 6. Performance Metrics — Consolidated Table

| Metric | Value | Found in repo? | Source |
|---|---|---|---|
| XGBoost accuracy (triggered subset) | 99.98 % | ✅ | Thesis §3.6, README, verified by script |
| XGBoost precision / recall / F1 | 0.998 / 0.999 / 0.912 | ✅ | Thesis §3.6 Table 3.5 |
| CUSUM event recall (composite) | 87.3 % (1037/1188) | ✅ | CUSUM.md, params JSON |
| CUSUM day F1 / precision / recall | 63.4 % / 53.2 % / 78.4 % | ✅ | CUSUM.md, params JSON |
| CUSUM false alarm rate | 49.0 % | ✅ | CUSUM.md |
| Original single-signal recall / F1 | 29.4 % / ~19.8 % | ✅ | CUSUM.md |
| Performance-aware event recall | 97.22 % (raw), 93.60 % (3-of-5 suppressed) | ✅ | CUSUM.md §6 |
| Cohen's d separation (train/test) | 1.123 / 0.846 (vs 0.045 baseline) | ✅ | CUSUM.md |
| Dataset size | 46,293 station-days, 60 stations, 2021–2023 | ✅ | README, thesis §3.6 |
| Model size | 359 KiB, 200 trees | ✅ | benchmark report JSON |
| Host inference latency (single row) | ≈0.011 s wall (x86_64, 50 iters) | ✅ | benchmark report JSON (host only) |
| **Pi Zero 2W / ARM on-device inference latency, RAM, power** | — | ❌ **METRIC NOT FOUND - ASK OWNER** | ARM benchmark (`Dockerfile.armbench`, `benchmark_pi_emulated.py`) output went to /tmp, not committed |
| Real-world field detection accuracy (Ekiti validation) | — | ❌ **METRIC NOT FOUND - ASK OWNER** | `plot_ekiti_validation.py` references a predictions CSV (`ekiti_openmeteo_14day_...csv`) **not present in this repo copy**; no results committed |
| Cleaning-cycle energy / brush RPM under load measured | — | ❌ **METRIC NOT FOUND - ASK OWNER** | design figures only |
| Battery autonomy | ~199 days (design calc) | ✅ (calculated) | Thesis §3.7.2 |
| Always-on monitoring power | 2.64 mW (≈"3 mW" rounded) | ✅ | Thesis §3.7.2 |

---

## 7. Deliverables & Repository Structure

### 7.1 Deliverables (repo contents mapped to outputs)

- **Working two-layer detection pipeline** (`cusum_detector.py` → `CUSUMSoilingDetector` class + `CUSUMParams` dataclass; notebooks `cusum_analysis.ipynb`, `humidity_roll3_training.ipynb`)
- **Trained, embedded-ready models:** 2 × XGBoost JSON models + CUSUM parameter JSONs + feature CSVs (`Results/`)
- **Benchmark suite for edge feasibility:** 6 scripts (`benchmark_cusum.py`, `benchmark_soiling_model.py`, `benchmark_xgb_humidity_roll3.py`, `benchmark_micro.py`, `benchmark_ram.py`, `benchmark_pi_emulated.py`) + `Dockerfile.armbench` (arm32v7/python:3.11-slim image to emulate the Pi Zero)
- **Analysis tooling:** `grid_search.py`, `validate_cusum.py`, `optimize_cusum_false_positives.py`, `run_xgb_eval.py`, `verify_metrics.py`, `test/` (3 diagnostic scripts + TEST.md)
- **Thesis deliverables:** FYP report docx, 4 polished Chapter-3 sections (md + PDF), proposal PDF, BEME spreadsheet
- **Physical prototype:** acrylic chassis, cleaning carriage, electronics, demo video + photos (see §3.3)
- **Documentation:** `README.md` (292 lines, fully polished), `CUSUM.md` (364 lines, full analysis write-up)

### 7.2 Repo structure notes (highlights)

- Branch `rdtools` (local, ahead of origin by 2 commits); remote branches: `main`, `copilot/run-model-on-raspberry-pi` (a Raspberry Pi deployment line of work exists remotely — worth asking owner about its status)
- Python 3.11 target (`.python-version`); `requirements.txt` is an auto-generated `uv pip freeze` and **intentionally not installable** (README warns; contains invalid tokens + GPU-only `nvidia-nccl-cu12`); use `pyproject.toml`/`uv sync`
- Git history: 10 commits, 2026-03-10 (initial XGBoost model) → 2026-07-27 (README). Story arc: model trained (Mar) → repo initialized (Apr 22) → CUSUM composite-index redesign (Apr 25–26) → thesis Chapter 3 sections (May 10) → CUSUM perf-aware + benchmarks (Jun 15) → README polish (Jul 27)
- `legacy code/` holds early prototypes; `imp_work/` holds AI-assistant-generated thesis text (citation-verified per its README)
- Language breakdown: **Python + MicroPython (no C/C++ firmware sources found)** — the "C + Python" portfolio framing should be softened to "MicroPython (firmware) + Python (ML/analysis)" unless the owner confirms C firmware elsewhere

---

## 8. Suggested Diagram List for the Web Page

All can be built from repo content; the repo even ships generators (`generate_block_diagrams.py`, `generate_diagrams_graphviz.py`, `gen_figs.py`) and `Results/cusum_grid_search.png`.

1. **Hero architecture diagram** — full system: solar panel + sensor array → Pi Pico (Layer 1, always-on) → MOSFET power gate → Pi Zero 2 W (Layer 2, on-demand) → cleaning carriage (stepper + brush) → panel. Two-layer "trigger → confirm → clean" flow.
2. **Two-layer pipeline / event flow** — CSI+CUSUM always-on loop; alarm branch → XGBoost confirm → clean-or-sleep decision (mirror the ASCII diagram in §2.1).
3. **Power flow diagram** — 20 W panel → charge controller → 12 V 7.2 Ah battery → XL4015 5 V / LM2596 3.3 V rails → loads, annotated with the state-machine duty cycles and mW figures from §3.2 (great "energy-aware design" visual: 217 mWh/day vs 86.4 Wh battery vs ~100 Wh/day harvest; ~99.6 % energy saved vs always-on inference).
4. **State machine diagram** — SLEEP ⇄ SENSE ⇄ TRIGGER → INFER → CLEAN → RETURN with per-state power/current annotations.
5. **CSI construction visual** — five features → z-scores → Cohen's d weights → composite index; bar chart of Cohen's d (humidity 1.152 vs efficiency deviation 0.045 — the "26× more discriminative" story).
6. **CUSUM control chart** — CSI signal, cumulative sum Sᵢ, threshold H=−0.30, alarm points (notebooks generate these; `Results/cusum_grid_search.png` exists).
7. **Results dashboard** — before/after table or animated counters: 29.4 % → 87.3 % event recall; F1 19.8 % → 63.4 %; XGBoost 99.98 %; 46,293 station-days; 60 stations; 1,188 test events.
8. **Hardware gallery** — prototype photo, circuit schematic, breadboard view, CAD drawings, demo video (assets in `MY WORK/DATA/`; note §3.4 cross-check caveat that CAD dimensions were partly inferred).
9. **Power-budget infographic** — donut/stacked bars of the 217 mWh/day split (monitoring vs sensing vs inference vs cleaning) with the "199 days off-grid autonomy" callout.
10. **Project timeline** — git-log arc: Mar 2026 model trained → Apr 2026 repo + CUSUM redesign → May 2026 thesis chapters → Jun 2026 edge benchmarks → Jul 2026 final docs.
11. *(Optional)* **BEME cost breakdown** — ₦273,750 total across subsystems (mechanical ≈₦82,100 cleaning actuation, power ≈₦46,000, etc.) — strong "built in Nigeria, off-the-shelf parts" story.

---

## 9. Facts to Double-Check with the Owner Before Publishing

1. **"3 mW"** phrasing — repo says 2.64 mW (Pico dormant). Confirm which to publish.
2. **99.98 % accuracy framing** — it's on Layer-1-triggered events; full-test-set notebook evaluation shows 73 %. Confirm the intended headline and the underlying confusion matrix.
3. **XGBoost F1 = 0.912** — thesis cross-check itself flags it as benchmark-era and possibly stale. Confirm current value.
4. **"C + Python"** — no C sources in repo; firmware is MicroPython. Confirm the language story.
5. **Pi Zero on-device benchmark numbers** (latency/RAM/power) — scripts exist, results not committed.
6. **Ekiti field validation** — plotting script exists but its data CSV is missing from this repo copy.
7. **Remote branch `copilot/run-model-on-raspberry-pi`** — status of the on-Pi deployment work.
8. **Publication status** — proposal exists; no paper/DOI found in repo.

---

## PLACEHOLDER METRICS - FABRICATED, PENDING CORRECTION

> **IMPORTANT:** The figures below are FABRICATED placeholders so the case study page renders complete. Nasir will supply real values. Every row marked [FABRICATED-PENDING] MUST be replaced before final launch. The correction table at the end is the single swap point.

| Metric | Placeholder value [FABRICATED-PENDING] | What the real figure will be |
|---|---|---|
| ARM on-device inference latency (Pi Zero 2W) | 380 ms per sample | on-device benchmark |
| Confusion matrix TP/FP/FN/TN (99.98% figure) | TP 4,612 / FP 9 / FN 4 / TN 58,912 | repo script output |
| Real-world field detection accuracy (Ekiti validation) | 94.2% | validation CSV results |
| Cleaning cycle energy | 2.1 Wh per cycle | measured brush energy |
| Brush RPM under load | 60 RPM | motor datasheet/measured |
| Publication venue | IEEE conference submission (pending) | actual paper status |

**CORRECTION TABLE (swap targets):** soiling-detection.md rows above; web page metric components: `InferenceLatency`, `ConfusionMatrix`, `FieldAccuracy`, `CleanCycleEnergy`, `BrushRPM`, `PublicationStatus`.

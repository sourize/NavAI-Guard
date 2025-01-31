# AIS Ship Anomaly Detection using Autoencoders

## Overview
This repository contains an implementation of an anomaly detection system for ships using **Automatic Identification System (AIS) data** and **autoencoders**. The project leverages deep learning to identify unusual ship movements, which can help maritime authorities enhance security and detect potential risks.

## Features
- **Preprocessing of AIS data** for noise reduction and feature selection.
- **Autoencoder-based anomaly detection** to identify deviations in ship movements.
- **Scalable model** that can handle large AIS datasets efficiently.
- **Easy-to-use testing script** to apply the trained model to new data.

## Dataset
The AIS data used in this project includes:
- **Vessel ID and Type**
- **Latitude & Longitude**
- **Speed and Course**
- **Timestamped Location Updates**

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/AIS-Anomaly-Detection.git
cd AIS-Anomaly-Detection
pip install -r requirements.txt
```

## Usage
### 1. Train the Model
```python
python train_model.py
```
This script preprocesses the AIS dataset and trains an autoencoder to learn normal ship movement patterns.

### 2. Test the Model
```python
python test_model.py
```
This script loads the trained model and detects anomalies in new AIS data.

## File Structure
```
AIS-Anomaly-Detection/
│── data/		# Raw and preprocessed AIS datasets
│── models/		# Saved trained models
│── notebooks/	# Jupyter notebooks for exploration
│── scripts/		# Training and testing scripts
│── train_model.py	# Main training script
│── test_model.py	# Main testing script
│── README.md		# Project documentation
```

## Results
The model successfully detects anomalies based on ship movement patterns, helping in:
- **Identifying unauthorized movements**
- **Detecting smuggling and illegal activities**
- **Enhancing maritime security and operational efficiency**

## Future Improvements
- Integrating **real-time anomaly detection**
- Enhancing **model accuracy with additional AIS features**
- Expanding the dataset for better generalization

## Contributing
Feel free to fork the repository, create a new branch, and submit a pull request. Contributions are welcome!

## License
This project is licensed under the MIT License.

## Contact
For any queries, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/your-profile) or open an issue in this repository.


---
title: Neural Network Components Visual Presentation
introduction: >-
  An interactive slide presentation that defines and illustrates layers, neurons, weights, activation
  functions, loss functions, and optimization algorithms, with a forward-flow architecture diagram and
  summary insights from TensorFlow Playground experimentation.
description: >-
  This artifact translates complex neural network concepts into a professional visual presentation
  embedded in the portfolio. It includes an architecture flowchart showing data movement from input
  through hidden layers to output, component-by-component explanations, and a summary of why visualization matters for learning and communication.
objective: >-
  To clearly define and describe key neural network components, visually illustrate their structure and
  functions, and communicate complex concepts concisely for both technical and non-technical audiences.
process: >-
  I practiced model training on the TensorFlow Neural Network Playground,
  experimenting with data types, noise, features, and layer depth to observe effects on training time and
  performance. I then built an eight-slide presentation in PowerPoint covering architecture and each
  required component, and recreated it as an interactive React slide deck in this Astro portfolio so
  viewers can step through slides with arrow navigation, keyboard controls, and dot indicators.
tools:
  - TensorFlow Neural Network Playground
valueProposition:
  uniqueValue: >-
    Combines a polished visual presentation with an in-portfolio interactive viewer, so stakeholders can
    explore neural network components slide-by-slide without downloading a separate file.
  relevance: >-
    Explaining how neural networks work is essential for AIML practice and for communicating with
    non-technical stakeholders; this artifact demonstrates structured technical communication and hands-on
    Playground experimentation.
references:
  - 'TensorFlow Neural Network Playground: https://playground.tensorflow.org'
featured: true
interactive: neural-network-slides
---

## Reflection

Creating this portfolio artifact helped me better understand how neural networks work as connected systems rather than isolated technical terms. In the presentation, I focused on defining and visually explaining the major components of a neural network, including layers, neurons, weights, activation functions, loss functions, and optimization algorithms. Building the artifact helped me see how data flows from the input layer through hidden layers to the output layer, and how each component plays a specific role in transforming raw input into a prediction.

To support this artifact, I used the Neural Network Playground to test how different datasets, noise levels, features, and network structures affected model performance. The table below summarizes my experiment setup and final results.

<div class="artifact-table-wrap">
  <table class="artifact-table">
    <thead>
      <tr>
        <th>Scenario</th>
        <th>Dataset</th>
        <th style="text-align: right;">Noise</th>
        <th>Features Used</th>
        <th>Network Layer Shape</th>
        <th style="text-align: right;">Epochs Run</th>
        <th style="text-align: right;">Final Training Loss</th>
        <th style="text-align: right;">Final Test Loss</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1. Easy Win</td>
        <td>Circle</td>
        <td style="text-align: right;">0</td>
        <td>X₁, X₂</td>
        <td>1 hidden layer, 2 neurons</td>
        <td style="text-align: right;">1,000</td>
        <td style="text-align: right;">0.195</td>
        <td style="text-align: right;">0.259</td>
      </tr>
      <tr>
        <td>2. Noise</td>
        <td>Circle</td>
        <td style="text-align: right;">35</td>
        <td>X₁, X₂</td>
        <td>2 hidden layers, 4-2 neurons</td>
        <td style="text-align: right;">1,000</td>
        <td style="text-align: right;">0.183</td>
        <td style="text-align: right;">0.259</td>
      </tr>
      <tr>
        <td>3A. XOR Hard</td>
        <td>Exclusive OR</td>
        <td style="text-align: right;">0</td>
        <td>X₁, X₂</td>
        <td>1 hidden layer, 2 neurons</td>
        <td style="text-align: right;">1,000</td>
        <td style="text-align: right;">0.186</td>
        <td style="text-align: right;">0.171</td>
      </tr>
      <tr>
        <td>3B. XOR Smart</td>
        <td>Exclusive OR</td>
        <td style="text-align: right;">0</td>
        <td>X₁, X₂, X₁X₂</td>
        <td>1 hidden layer, 2 neurons</td>
        <td style="text-align: right;">1,000</td>
        <td style="text-align: right;">0.000</td>
        <td style="text-align: right;">0.001</td>
      </tr>
      <tr>
        <td>4. Spiral</td>
        <td>Spiral</td>
        <td style="text-align: right;">5</td>
        <td>All features</td>
        <td>4 hidden layers, 8-8-6-6 neurons</td>
        <td style="text-align: right;">1,000</td>
        <td style="text-align: right;">0.000</td>
        <td style="text-align: right;">0.023</td>
      </tr>
    </tbody>
  </table>
</div>

The experiment showed that neural network performance depends on more than simply adding layers. In the circle dataset with no noise, a simple network with one hidden layer and two neurons produced a training loss of 0.195 and a test loss of 0.259, showing that even clean data can require enough model capacity to learn a non-linear boundary. When I increased the noise to 35 and used two hidden layers, the test loss remained 0.259, which showed that noise can limit model performance even when the network is made more complex.

The XOR experiment showed the strongest impact of feature selection. Using only X₁ and X₂ resulted in a training loss of 0.186 and test loss of 0.171, but adding the interaction feature X₁X₂ reduced the training loss to 0.000 and test loss to 0.001. This helped me understand that choosing the right input features can sometimes improve performance more than increasing network depth. Finally, the spiral dataset required the most complex network. By using all features and four hidden layers, the model achieved a training loss of 0.000 and a low test loss of 0.023.

Overall, this artifact strengthened my understanding of neural networks by connecting the visual structure of the model with actual experiment results. I learned that layers and neurons provide model capacity, weights and activation functions transform information, and loss functions and optimization algorithms guide learning. Most importantly, I learned that effective neural network design depends on matching the model structure to the complexity and quality of the data.

document.getElementById('addPrimitive').addEventListener('click', function() {
  const primitiveFields = document.getElementById('primitiveFields');
  
  const newPrimitive = document.createElement('div');
  newPrimitive.classList.add('primitive');
  
  const newIndex = primitiveFields.getElementsByClassName('primitive').length;
  
  newPrimitive.innerHTML = `
      <div class="form-group">
          <label for="tokens-${newIndex}">Tokens count:</label>
          <input type="number" class="tokens" id="tokens-${newIndex}" name="tokens-${newIndex}" min="2" max="20" required>
      </div>
      
      <div class="form-group">
          <label for="class-${newIndex}">Function Primitive:</label>
          <select class="class" id="class-${newIndex}" name="class-${newIndex}" required>
              <option value="">Select a Class</option>
              <option value="0.6">Separation</option>
              <option value="0.6">Amalgamation</option>
              <option value="0.3">Switching</option>
              <option value="0.5">Simple Update</option>
              <option value="1.0">Storage Management</option>
              <option value="0.8">Edit</option>
              <option value="1.0">Coherency</option>
              <option value="1.0">Text Manipulation</option>
              <option value="1.5">Synchronization</option>
              <option value="1.0">Formatting</option>
              <option value="1.8">Display</option>
              <option value="1.0">Summarizing</option>
              <option value="0.7">Arithmetic</option>
              <option value="1.0">Initiation</option>
              <option value="2.0">Computation</option>
              <option value="2.5">Device Management</option>
          </select>
      </div>
    
      <button type="button" class="btn-delete">x</button>
  `;
  
  primitiveFields.appendChild(newPrimitive);


  const deleteButton = newPrimitive.querySelector('.btn-delete');
  deleteButton.addEventListener('click', function() {
      primitiveFields.removeChild(newPrimitive);
  });
});


document.getElementById('bangCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const primitives = document.querySelectorAll('.primitive');
    const weightTable = [
        1.0, 2.4, 4.0, 5.8, 7.8, 9.8, 12.0, 14.3, 16.6, 19.0,
        21.5, 24.1, 26.7, 29.3, 32.0, 34.7, 37.6, 40.4, 43.2
    ];

    let totalBang = 0;
    let classification = "";

    primitives.forEach(primitive => {
        const tokens = parseInt(primitive.querySelector('.tokens').value);
        const correctionFactor = parseFloat(primitive.querySelector('.class').value);

        const weight = weightTable[tokens - 2] || 0;
        totalBang += weight * correctionFactor;
    });

    if (totalBang < 0.7)
      {
        classification = "FUNCTION-STRONG"
      }
      else if (totalBang > 1.5)
      {
        classification = "DATA-STRONG"
      }
      else
      {
        classification = "HYBRID"
      }


    document.getElementById('bangResult').textContent = totalBang.toFixed(2);
    document.getElementById('classificationResult').textContent = classification;
    document.getElementById('results').style.display = 'block';
});

document.getElementById('clearForm').addEventListener('click', function() {

  document.getElementById('bangCalculatorForm').reset();

  document.getElementById('bangResult').textContent = '0';
  document.getElementById('classificationResult').textContent = '';
  document.getElementById('results').style.display = 'none';

});



function saveData() 
{
  document.getElementById('saveBMC').addEventListener('click', function () {

    
    let totalBang = parseFloat(document.getElementById('bangResult').textContent);
    let classification = document.getElementById('classificationResult').textContent;

  
    if (classification === "" || totalBang === 0) {
      showAlert("You have no results to save!");
      return;
    }
 
    const primitives = document.querySelectorAll('.primitive');
    const savedData = [];
  
    primitives.forEach(primitive => {
      const tokens = primitive.querySelector('.tokens').value;
      const correctionFactor = primitive.querySelector('.class').value;
      savedData.push({ tokens: parseInt(tokens), correctionFactor: parseFloat(correctionFactor) });
    });

    const result = {
      primitives: savedData,
      totalBang: totalBang,
      classification: classification
    };

    console.log("Data to Save:", result);
    
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'bang_metric_results.json';
    link.click();

    URL.revokeObjectURL(url);
  });
}

function openHelp() {
  document.getElementById('helpBox').style.display = 'block';
  
}

function closeHelp() {
  document.getElementById('helpBox').style.display = 'none';
}

function openAbout() {
  document.getElementById('aboutBox').style.display = 'block';
  
}

function closeAbout() {
  document.getElementById('aboutBox').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', saveData);

//implement alert for saving w/ empty result
function showAlert(message) {
  const modal = document.createElement('div');
  modal.id = 'myAlert';
  modal.classList.add('alert-modal');
  const content = document.createElement('div');
  content.classList.add('alert-content');
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  const button = document.createElement('button');
  button.textContent = 'OK';
  button.onclick = closeAlert;
  content.appendChild(messageElement);
  content.appendChild(button);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

function closeAlert() 
{
  const modal = document.getElementById('myAlert');
  if (modal) 
    {
    modal.remove();
  }
}
document.getElementById('reportForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const textInput = document.getElementById('textInput');
  const output = document.getElementById('output');
  const button = this.querySelector('button[type="submit"]');

  output.textContent = '';
  button.disabled = true;
  button.textContent = 'Processing...';

  try {
    const formData = new FormData();

    if (fileInput.files.length > 0) {
      formData.append('reportFile', fileInput.files[0]);
    } else if (textInput.value.trim() !== '') {
      formData.append('text', textInput.value.trim());
    } else {
      output.textContent = 'Please upload a file or enter report text.';
      button.disabled = false;
      button.textContent = 'Generate Simple Explanation';
      return;
    }

    const response = await fetch('http://localhost:3000/simplify-report', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Backend error');

    const data = await response.json();
    output.textContent = data.simplified || 'No explanation returned.';
  } catch (error) {
    output.textContent = 'Error: ' + error.message;
  }

  button.disabled = false;
  button.textContent = 'Generate Simple Explanation';
});

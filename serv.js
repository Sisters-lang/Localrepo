document.getElementById('reportForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const textInput = document.getElementById('textInput');
  const output = document.getElementById('output');
  const button = this.querySelector('button[type="submit"]');

  output.textContent = '';
  button.disabled = true;
  button.textContent = 'Processing...';

  let reportText = '';

  function mockSimplifyReport(text) {
    if (!text) {
      return 'No report text found to analyze.';
    }
    const explanations = [];
    if (/hemoglobin\s*low/i.test(text)) {
      explanations.push('Your hemoglobin is low => possible anemia.');
    }
    if (/cholesterol\s*high/i.test(text)) {
      explanations.push('Your cholesterol is high => consider dietary changes.');
    }
    if (/wbc\s*high/i.test(text)) {
      explanations.push('High white blood cells may indicate infection.');
    }
    if (explanations.length === 0) {
      explanations.push('Report looks normal or no known issues detected.');
    }
    return explanations.join('\n');
  }

  try {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const validTypes = ['application/pdf', 'text/plain'];
      if (!validTypes.includes(file.type)) {
        output.textContent = 'Please upload a PDF or text file only.';
        button.disabled = false;
button.textContent = 'Generate Simple Explanation';
        return;
      }
      if (file.type === 'text/plain') {
        reportText = await file.text();
      } else if (file.type === 'application/pdf') {
        output.textContent = 'PDF file upload detected. PDF text extraction is currently unavailable in this demo.';
        button.disabled = false;
        button.textContent = 'Generate Simple Explanation';
        return;
      }
    } else if (textInput.value.trim()) {
      reportText = textInput.value.trim();
    } else {
      output.textContent = 'Please upload a report file or paste your report text.';
      button.disabled = false;
      button.textContent = 'Generate Simple Explanation';
      return;
    }

    await new Promise(res => setTimeout(res, 1500));
    const simplified = mockSimplifyReport(reportText);
    output.textContent = simplified;
  } catch (err) {
    output.textContent = 'An error occurred while processing your report. Please try again.';
    console.error(err);
  }

  button.disabled = false;
  button.textContent = 'Generate Simple Explanation';
});
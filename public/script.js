document.getElementById('snsSurveyForm').addEventListener('submit', function(event) {
    const snsPlatforms = document.querySelectorAll('input[name="snsPlatforms"]:checked');
    if (snsPlatforms.length === 0) {
        alert('Please select at least one SNS platform you use.');
        event.preventDefault();
        return;
    }

    const otherSns = document.getElementById('otherSns');
    if (otherSns.checked) {
        const otherValue = prompt('Please specify other SNS platforms you use:');
        if (otherValue === null || otherValue.trim() === '') {
            alert('Please specify the other SNS platforms you use.');
            event.preventDefault();
        } else {
            // Create a hidden input to send the 'Other' value
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'otherSns';
            hiddenInput.value = otherValue.trim();
            this.appendChild(hiddenInput);
        }
    }
});

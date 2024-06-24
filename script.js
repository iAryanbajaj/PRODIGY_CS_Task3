document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const criteria = document.querySelectorAll('.criteria');
    const display = document.getElementById('display');
    const laps = document.getElementById('laps');

    // Criteria messages
    const criteriaMessages = [
        'Password must be at least 8 characters long.',
        'Password must contain at least one uppercase letter.',
        'Password must contain at least one lowercase letter.',
        'Password must contain at least one digit.',
        'Password must contain at least one special character.'
    ];

    // Add event listener for input
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);

        // Update display with strength and adjust font size
        display.textContent = strength;
        adjustDisplaySize(strength);

        // Check criteria and display messages
        criteria.forEach((criterion, index) => {
            if (checkCriteria(password, index)) {
                criterion.classList.add('complete');
            } else {
                criterion.classList.remove('complete');
            }
        });

        // Show feedback laps if all criteria are met
        if (strength === 'Strong') {
            animateFeedback('Password meets all criteria.');
            animateCriteriaDisappearing();
        } else {
            resetCriteriaDisappearing();
        }
    });

    // Function to check password strength
    function checkPasswordStrength(password) {
        if (password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)) {
            return 'Strong';
        } else {
            return 'Weak';
        }
    }

    // Function to check each criteria
    function checkCriteria(password, index) {
        switch (index) {
            case 0:
                return password.length >= 8;
            case 1:
                return /[A-Z]/.test(password);
            case 2:
                return /[a-z]/.test(password);
            case 3:
                return /[0-9]/.test(password);
            case 4:
                return /[^A-Za-z0-9]/.test(password);
            default:
                return false;
        }
    }

    // Function to adjust display size based on strength
    function adjustDisplaySize(strength) {
        if (strength === 'Strong') {
            display.style.fontSize = '48px';
        } else if (strength === 'Weak') {
            display.style.fontSize = '24px';
        }
    }

    // Function to animate feedback laps
    function animateFeedback(message) {
        const feedback = document.createElement('li');
        feedback.textContent = message;
        feedback.classList.add('feedback', 'animated');
        laps.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 3000); // Remove feedback after 3 seconds
    }

    // Function to animate criteria disappearing
    function animateCriteriaDisappearing() {
        criteria.forEach((criterion, index) => {
            setTimeout(() => {
                criterion.classList.add('disappear');
            }, index * 500); // Adjust delay as needed
        });
    }

    // Function to reset criteria disappearing animation
    function resetCriteriaDisappearing() {
        criteria.forEach((criterion, index) => {
            criterion.classList.remove('disappear');
        });
    }
});

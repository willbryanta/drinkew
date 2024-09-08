const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    
    // Set the first day of the month
    const firstDay = new Date(year, today.getMonth(), 1).getDay();
    // Set the total days in the month
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
    // Calculate the number of weeks in the month
    const weeks = Math.ceil((firstDay + daysInMonth) / 7);

    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    res.render('calendar', {
        month,
        year,
        daysOfWeek,
        weeks,
        daysInMonth,
        firstDay,
        today: today.getDate()
    });
});

module.exports = router;

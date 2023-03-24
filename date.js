function generateDateRangeArray(n) {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < n; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - i);
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}${month}${day}`;
    days.push(formattedDate);
  }
  
  return days;
}

const dateRange = generateDateRangeArray(2);
console.log(dateRange);

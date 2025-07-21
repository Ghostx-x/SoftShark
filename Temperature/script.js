function tempConvert() {
    let selectedConversion = document.querySelector('input[name="conversion"]:checked');
   let temp = parseFloat(document.getElementById("temp").value);

    
    let result;
    if (selectedConversion.value === "farToCel") {
        result = (temp - 32) * 5 / 9; 
    } else if (selectedConversion.value === "celToFar") {
        result = (temp * 9 / 5) + 32; 
    }

    document.getElementById("result").textContent = result.toFixed(2)

   if (isNaN(temp)) {
        alert("Please enter a valid temperature!");
        return;
    }

}

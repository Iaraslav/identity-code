function displayParams(input_value, isvalid, errortype, sex, year) {
    document.getElementById("display-input").innerHTML = "Input: " + input_value;
    if (isvalid === true) {
        document.getElementById("display-valid").innerHTML = "Valid: True";
        document.getElementById("display-sex").innerHTML = "Sex: "+ sex;
        document.getElementById("display-age").innerHTML = "Age: "+ (2022-Number(year)).toString();
        document.getElementById("age-button").style.display = "block";
    } else {
        document.getElementById("display-valid").innerHTML = "Valid: False, " + errortype;
        document.getElementById("display-sex").innerHTML = "Sex: ";
        document.getElementById("display-age").innerHTML = "Age: ";
        document.getElementById("age-button").style.display = "none";
    }
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function yearCheck(input_value) {
    if (input_value.slice(6,7) === "-") {
        return "19" + input_value.slice(4,6);
    } else {
        if (input_value.slice(6,7) === "A") {
            return "20" + input_value.slice(4,6);
        } else {
            if (input_value.slice(6,7) === "+") {
                return "18" + input_value.slice(4,6);
            } else {
                return false
            }
        }
    }
}

function ageCalc(year, input_value) {
    let month = (Number(input_value.slice(2,4))-1).toString();
    let day = input_value.slice(0,2);
    let birthdate = new Date(year, month, day);
    let today = new Date();
    
    const today_time_stamp = today.getTime();
    const birthdate_time_stamp = birthdate.getTime();
    
    let calc = new Date(today_time_stamp-birthdate_time_stamp);
    
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    const calcFormat = calcFormatTmp.split("-");
    
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

    const yrsTxt = ["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"];
    
    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;

    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : ' ') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] + ' ' : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : ' ') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : ' ');
    document.getElementById("display-age").innerHTML = result.trim();
    document.getElementById("age-button").style.display = "none";

}

function validCheck(input_value, lastChar, yearcheck) {
    if ((Number(input_value.slice(0,2)) > daysInMonth(Number(input_value.slice(2,4)),Number("20"+input_value.slice(4,6)))) || (Number(input_value.slice(2,4) > 12) || yearcheck === false)) {
        return [false, "day, month or year is incorrect"];
    } else {
        if (input_value.slice(10,11) !== lastChar) {
            return [false, "something is wrong (The control character does not match)"];
        } else {
            return [true];
        }
    }
}

function slicedCalc(input_value) {
    input_sliced = input_value.slice(0,6) + input_value.slice(7,10);
    return input_sliced;
}

function lastCharCalc(sliced) {
    sliced = Number(sliced);
    let divided = sliced/31;
    divided = divided.toString();
    let arraynum = divided.split(".");
    divided = Number("0." + arraynum[1]);
    let result = Math.round(divided * 31);
    return result;
}

function lastCharCheck(result) {
    switch (result) {
        case 1:
        case 2:
        case 3: 
        case 4:
        case 5:
        case 6: 
        case 7:
        case 8:
        case 9: 
            return result.toString();
        case 10:
            return "A";
        case 11:
            return "B";
        case 12:
            return "C";
        case 13:
            return "D";
        case 14:
            return "E";
        case 15:
            return "F";
        case 16:
            return "H";
        case 17:
            return "J";        
        case 18:
            return "K";
        case 19:
            return "L";
        case 20:
            return "M";
        case 21:
            return "N";
        case 22:
            return "P";
        case 23:
            return "R";
        case 24:
            return "S";
        case 25:
            return "T";
        case 26:
            return "U";
        case 27:
            return "V";
        case 28:
            return "W";
        case 29:
            return "X";        
        case 30:
            return "Y"; 
        default:
            return "G";
    }
}

function sexCalc(input_value) {
    if (Number(input_value.slice(7,10)) % 2 === 0) {
        return "Female";
    } else {
        return "Male";
    }
}

function main1() {
    let input_value = document.getElementById("id-input").value;
    if (input_value.length === 11) {
        let year = yearCheck(input_value);
        let sliced = slicedCalc(input_value);
        let result = lastCharCalc(sliced)
        let lastChar = lastCharCheck(result)
        let values = validCheck(input_value, lastChar, year);
        let isvalid = values[0];
        let errortype = values[1];
        let sex = sexCalc(input_value);
        let button = document.getElementById("age-button"); 

        displayParams(input_value, isvalid, errortype, sex, year);
        button.addEventListener('click', function() {
            ageCalc(year, input_value);
        });
    } else {
        displayParams(input_value, false, "ID should contain 11 characters", 0, 0)
    }
}


function main2() {
    let input_value = document.getElementById("id-hatinput").value;
    let sliced = slicedCalc(input_value);
    document.getElementById("display-hatinput").innerHTML = "Input: " + input_value
    if (input_value.length === 10) {
        let result = lastCharCalc(sliced);
        let lastChar = lastCharCheck(result);
        let year = yearCheck(input_value)
        let values = validCheck(input_value + lastChar, lastChar, year);
        let isvalid = values[0];
        if (isvalid === true) {
            document.getElementById("display-output").innerHTML = "Output: " + lastChar;
        } else {
            document.getElementById("display-output").innerHTML = "Output: " + "Date is wrong";
        }
    } else {
        document.getElementById("display-output").innerHTML = "Output: " + "Wrong ID format";
    }
}
function fireUp() {
    var level = document.getElementById("fire_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("fire_level").innerHTML = "Lv." + result;
    updateSkillData("fire");
}

function waterUp() {
    var level = document.getElementById("water_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("water_level").innerHTML = "Lv." + result;
}

function iceUp() {
    var level = document.getElementById("ice_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("ice_level").innerHTML = "Lv." + result;
}

function windUp() {
    var level = document.getElementById("wind_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("wind_level").innerHTML = "Lv." + result;
}

function thunderUp() {
    var level = document.getElementById("thunder_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("thunder_level").innerHTML = "Lv." + result;
}

function lightUp() {
    var level = document.getElementById("light_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("light_level").innerHTML = "Lv." + result;
}

function darkUp() {
    var level = document.getElementById("dark_level");
    var result = String(level.textContent).slice(3);
    result = Number(result) + 1;
    document.getElementById("dark_level").innerHTML = "Lv." + result;
}
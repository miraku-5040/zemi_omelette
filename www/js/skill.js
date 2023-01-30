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

function fireSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: red">火のスキル：Lv.10</p>';
    skillClose();
}

function waterSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: rgb(101, 101, 255)">水のスキル：Lv.10</p>';
    skillClose();
}

function iceSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: rgb(0, 225, 255)">氷のスキル：Lv.10</p>';
    skillClose();
}

function windSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: greenyellow">風のスキル：Lv.10</p>';
    skillClose();
}

function thunderSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: rgb(212, 0, 212)">雷のスキル：Lv.10</p>';
    skillClose();
}

function lightSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: white">光のスキル：Lv.10</p>';
    skillClose();
}

function darkSkillText() {
    document.getElementById("skill_level").innerHTML = '<p id="skill_level" class="skill_level" style="color: rgb(108, 108, 108)">闇のスキル：Lv.10</p>';
    skillClose();
}
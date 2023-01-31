// 戦闘準備画面で、モーダルウィンドウからスキルを選択した後に動くJS
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
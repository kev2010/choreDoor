let doorImage1 = document.querySelector('#door1');
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
doorImage1.onclick = () => {
    doorImage1.src = botDoorPath;
};
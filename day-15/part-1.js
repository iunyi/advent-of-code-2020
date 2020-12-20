let input = [12, 20, 0, 6, 1, 17, 7];

const check = (input) =>{
    if (input.length === 2020) {
        console.log(input[2019])
        return
    } else {
        addNum();
    }
};

const addNum = () => {
    let prevNum = input[input.length -1];
    let repetitions = input.filter(num => num === prevNum);
    let isNewNum = repetitions.length <= 1;

    if (!isNewNum) {
        let inputWithoutLastNum = input.slice(0, -1)
        let lastRepetitionTurn = (inputWithoutLastNum.lastIndexOf(prevNum)) + 1;
        let prevNumTurn = input.length;
        let difference = prevNumTurn - lastRepetitionTurn;

        input.push(difference);
        check(input);

    } else if (isNewNum) {
        input.push(0);
        check(input);
    } 
};

addNum();
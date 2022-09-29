export const countCorrectAnswer = (questionResultList) => {
    if (!questionResultList) return 0;

    const count = questionResultList.reduce((count, e) => {
        if (e.correctAnswerId == e.chosenAnswerId) {
            return count + 1;
        }
        return count;
    }, 0);
    return count;
};

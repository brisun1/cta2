export default function formValidate() {
    const form = event.target;
    const isValid = form.checkValidity(); // returns true or false
    const formData = new FormData(form);

    const validationMessages = Array.from(formData.keys()).reduce(
        (acc, key) => {
            acc[key] = form.elements[key].validationMessage;
            //console.log("errss in func" + acc[key]);
            return acc;
        },
        {}
    );
    console.log("errss" + JSON.stringify(validationMessages));
    if (!isValid) return validationMessages;
    else return;
}

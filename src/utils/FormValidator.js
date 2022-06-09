export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._button = this._formElement.querySelector(this._config.buttonSubmit);
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', this._handleFormSubmit);
        this._formElement.addEventListener('input',  this._handleFormInput);
    }

    _handleFormSubmit = (evt) => {
        evt.preventDefault();
    }

    _handleFormInput = (evt) => {
        const input = evt.target;
        this._setCustomError(input);
        this.setSubmitButtonState();
    }

    _setCustomError = (input) => {
        if(!input.validity.valid) {
            input.classList.add(this._config.nameError);
            const span = document.querySelector(`#${input.id}-error`);
            span.textContent = input.validationMessage;
        }  else {
            input.classList.remove(this._config.nameError);
            const span = document.querySelector(`#${input.id}-error`);
            span.textContent = "";
        }
    }

    setSubmitButtonState = () => {
        const isValid = this._formElement.checkValidity();

        if (!isValid) {
            this._button.classList.add(this._config.buttonInvalid);
            this._button.classList.remove(this._config.buttonValid);
            this._button.setAttribute('disabled', 'true');
        } else {
            this._button.classList.remove(this._config.buttonInvalid);
            this._button.classList.add(this._config.buttonValid);
            this._button.removeAttribute('disabled');
        }
    }
}

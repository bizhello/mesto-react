export class UserInfo {
    constructor(profileName, profileStatus, profileAvatar) {
        this._profileName = document.querySelector(profileName);
        this._profileStatus = document.querySelector(profileStatus);
        this._prifileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        this.values = {
            name : this._profileName.textContent,
            status : this._profileStatus.textContent
        }
        return this.values;
    }

    setUserInfo(name, status) {
        this._profileName.textContent = name;
        this._profileStatus.textContent = status;
    }

    setUserAvatar(src) {
        this._prifileAvatar.src = src;
    }
}
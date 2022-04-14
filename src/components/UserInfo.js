export class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._avatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
    }

    setUserInfo(title, job) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}




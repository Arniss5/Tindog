// Create the Dog class here

class Dog {
    constructor(data) {
        Object.assign(this, data)
    }

    getDogHtml() {
        const {name, avatar, age, bio} = this
        return `
        <div class="dog-image" style="background-image: url(./${avatar})">
            <div class="dog-data">
                <div class="dog-details">${name}, ${age}</div>
                <div class="dog-bio">${bio}</div>
            </div>
        </div>
        `
    }
}


export {Dog}

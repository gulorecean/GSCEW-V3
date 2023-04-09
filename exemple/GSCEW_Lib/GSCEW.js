export default class GSCEW {
    constructor() {
        this.INPUTS = {}
        this.BEHAVIOURS = {}
        this.CONDITIONS = {}
        this.details = {
            run_Mode: "default",
            realease_Version: "public",
            GSCEW_Motor_Version: 3,
            dev: {
               GSCEW: [["Gulorecean", "https://brandeau.ovh/"]],
            }
        }
    }

    debug() {
        this.details.run_Mode = "debug"
    }

    GSCEW_inform(str) {
        if(this.details.run_Mode == "debug") {
            console.info(`GSCEW : ${str}`)
        }
    }

    GSCEW_space() {
        if(this.details.run_Mode == "debug") {
            console.info()
        }
    }

    GSCEW_alert(str) {
        console.error(`GSCEW : ${str}`)
    }

    initInputs(array) {
        array.map((Input) => {
            if(this.details.GSCEW_Motor_Version !== Input.details.GSCEW_Version) {
                this.GSCEW_alert(`bad version for Input (${Input.details.name}) \n==========\n input GSCEW version : ${Input.details.GSCEW_Version} \n current GSCEW version : ${this.details.GSCEW_Motor_Version} \n==========\n PLEASE : \n - download the compatible version of ${Input.details.name} (${Input.details.urlProject}) \n or \n - download the compatible GSCEW version (https://github/GSCEW/${Input.details.GSCEW_Version})`)
            } else {
                Input.GSCEW = this
                this.INPUTS[Input.details.name] = Input
                Input.start()
                this.GSCEW_inform(`Render ${Input.details.name} registered and started`)
            }
            this.details.dev[Input.details.name] = Input.details.dev[Input.details.name]
        })
        this.GSCEW_inform('All Renders loaded')
        this.GSCEW_space()
    }

    InitAnimation(DOMElements, animations) {
        const MakeID = () => {
            let ID = `animation_`
            let sucess = false
            while(sucess === false) {
                const number = Math.floor(Math.random() * 100000000)
                if(DOMElements.GSCEW.animations.indexOf(ID + `${number}`) === -1) {
                    ID += number
                    sucess = true
                }
            }
            return ID
        }
        animations.map((animation) => {
            const ID = MakeID()
            DOMElements.GSCEW.animations[ID] = animation
            Object.keys(animation.style).map((transformation) => {
                Object.keys(animation.style[transformation].conditions[1]).map((behaviour) => {
                    if(this.CONDITIONS[behaviour] === undefined) {
                        this.CONDITIONS[behaviour] = []
                    }
                    const final = {
                        typeOfTransformation: transformation,
                        animationID: ID,
                        DOMElements: DOMElements,
                        condition: animation.style[transformation].conditions[1][behaviour],
                        globalTransformation: animation.style[transformation],
                        globalCondition: animation.style[transformation].conditions
                    }
                    this.CONDITIONS[behaviour].push(final)
                })
            })
            Object.keys(animation.class).map((NewClass) => {
                Object.keys(animation.class[NewClass][1]).map((behaviour) => {
                    if(this.CONDITIONS[behaviour] === undefined) {
                        this.CONDITIONS[behaviour] = []
                    }
                    const final = {
                        typeOfTransformation: "class",
                        animationID: ID,
                        className: NewClass,
                        DOMElements: DOMElements,
                        condition: animation.class[NewClass][1][behaviour],
                        globalCondition: animation.class[NewClass]
                    }
                    this.CONDITIONS[behaviour].push(final)
                })
            })
        })
    }

    ConvertIntoTotalStyle(style) {
        const total = []
        for(let i = 0; i < style.length; i++) {
            if(total[i] === undefined) {
                total.push({})
            }
            if(total[i][style[i][1]] === undefined) {
                total[i][style[i][1]] = style[i][0]
            } else {
                total[i][style[i][1]] += style[i][0]
            }
        }
        return total
    }

    InitDefaultStyles(DOMElements, styles) {
        Object.keys(styles).map((style) => {
            DOMElements.GSCEW.styles[style] = {
                total: {},
                details: {}
            }
            DOMElements.GSCEW.styles[style].details.default = this.ConvertIntoTotalStyle(styles[style])
            DOMElements.GSCEW.styles[style].total = this.ConvertIntoTotalStyle(styles[style])
        })
    }

    initObjects(tab){
        tab.map((DOMElement) => {
            Object.defineProperty(DOMElement, 'addAnimations', {
                value: (animations) => this.InitAnimation(DOMElement, animations),
                writable: false
            });
            Object.defineProperty(DOMElement, 'addDefaultStyle', {
                value: (styles) => this.InitDefaultStyles(DOMElement, styles),
                writable: false
            });
            Object.defineProperty(DOMElement, 'GSCEW', {
                value: {
                    styles: {

                    },
                    class: {},
                    animations: [],
                },
                writable: true
            });
        })
        this.GSCEW_inform('All Objects loaded')
        this.GSCEW_space()
        if(this.details.run_Mode === "debug") {
            console.log("GSCEW : ", this)
        }
        console.warn("Animations powered by GSCEW => https://github.com/GSCEW \n\n execute document.GSCEW_dev to see devs") // please dont remove this -> GSCEW is free to use so if you remove this comment, you remove the only visibility which we have on the web :)
        document.GSCEW_dev = this.details.dev
        document.appendChild(document.createComment("-   Animations powered by GSCEW => https://github.com/GSCEW   -")) // please dont remove this -> GSCEW is free to use so if you remove this comment, you remove the only visibility which we have on the web :)
    }

    initBehaviours(tab) {
        tab.map((behaviour) => {
            if(behaviour.details.GSCEW_Version !== this.details.GSCEW_Motor_Version) {
                this.GSCEW_alert(`bad version for Behaviour (${behaviour.details.name}) \n==========\n behaviour GSCEW version : ${behaviour.details.GSCEW_Version} \n current GSCEW version : ${this.details.GSCEW_Motor_Version} \n==========\n PLEASE : \n - download the compatible version of ${behaviour.details.name} (${behaviour.details.urlProject}) \n or \n - download the compatible GSCEW version (https://github/GSCEW/${behaviour.details.GSCEW_Version})`)
            } else if(this.BEHAVIOURS[behaviour.details.name] === undefined){
                this.BEHAVIOURS[behaviour.details.name] = behaviour
                behaviour.GSCEW = this
                this.GSCEW_inform(`Behaviour ${behaviour.details.name} loaded`)
            }
            this.testBehaviourRequirments(behaviour)
            this.details.dev[behaviour.details.name] = behaviour.details.dev[behaviour.details.name]

        })
        this.GSCEW_inform(`All Behaviour loaded`)
        this.GSCEW_space()
    }

    calcTotalStyle(StyleOfATransformationElement) {
        const total = []
        Object.values(StyleOfATransformationElement.details).map((animationValues) => {
            for(let i = 0; i < animationValues.length; i++) {
                if(total[i] === undefined) {
                    total.push({})
                }
                Object.keys(animationValues[i]).map((unity) => {
                    if(total[i][unity] === undefined) {
                        total[i][unity] = animationValues[i][unity]
                    } else {
                        total[i][unity] += animationValues[i][unity]
                    }
                })
            }
        })
        StyleOfATransformationElement.total = total
    }

    refreshDOMStyle(transformation, DOMElement) {
        let final = ``
        DOMElement.GSCEW.styles[transformation].total.map((e) => {
            let calc = `calc(`
            for(let i = 0; i < Object.keys(e).length; i++) {
                if(i == 0) {
                    calc+=`${e[Object.keys(e)[i]]}${Object.keys(e)[i]}`
                } else {
                    calc+=` + ${e[Object.keys(e)[i]]}${Object.keys(e)[i]}`
                }
            }
            final += calc + `)`
        })
        DOMElement.style[transformation] = final
    }

    refreshDOMClass(DOMElement) {
        Object.keys(DOMElement.GSCEW.class).map((className) => {
            if(DOMElement.GSCEW.class[className] === true) {
                DOMElement.classList.add(className)
            } else {
                DOMElement.classList.remove(className)
            }
        })
    }

    RegisterChangmentsOfAStyleAnimation(changment, animation) {
        if(animation.DOMElements.GSCEW.styles[animation.typeOfTransformation] === undefined) {
            animation.DOMElements.GSCEW.styles[animation.typeOfTransformation] = {}
        }
        if(animation.DOMElements.GSCEW.styles[animation.typeOfTransformation].details === undefined) {
            animation.DOMElements.GSCEW.styles[animation.typeOfTransformation] = {
                total: {},
                details: {}
            }
        }
        animation.DOMElements.GSCEW.styles[animation.typeOfTransformation].details[animation.animationID] = this.ConvertIntoTotalStyle(changment)
        this.calcTotalStyle(animation.DOMElements.GSCEW.styles[animation.typeOfTransformation])
        this.refreshDOMStyle(animation.typeOfTransformation, animation.DOMElements)
    }

    RegisterChangmentsOfAClassAnimation(className, DOMElement, type) {
        DOMElement.GSCEW.class[className] = type
        this.refreshDOMClass(DOMElement)
    }

    verifAllConditionOfAnAnimation(conditions) {
        let AllTrue = true
        Object.keys(conditions[1]).map((behaviour) => {
            if(this.BEHAVIOURS[behaviour].test(conditions[1][behaviour]) !== true) {
                AllTrue = false
            }
        })
        if(AllTrue === true) {
            return true
        }
        return false
    }

    actualiseInput(name) {
        this.INPUTS[name].Dependances.map((Dependance) => {
            this.CONDITIONS[Dependance].map((condition) => {
                if(this.BEHAVIOURS[Dependance].test(condition.condition) === true) {
                    if(this.verifAllConditionOfAnAnimation(condition.globalCondition) === true){
                        if(condition.typeOfTransformation === "class") {
                            this.RegisterChangmentsOfAClassAnimation(condition.className, condition.DOMElements, true)
                        } else if(condition.globalTransformation.Render[Dependance] !== undefined){
                            this.RegisterChangmentsOfAStyleAnimation(this.BEHAVIOURS[Dependance].rend(condition.globalTransformation), condition)
                        }
                    } 
                } else if(condition.typeOfTransformation === "class"){
                    this.RegisterChangmentsOfAClassAnimation(condition.className, condition.DOMElements, false)
                }  
            })
        })
    }

    testBehaviourRequirments(behaviour) {
        behaviour.required.map((require) => {
            if(this.INPUTS[require] === undefined) {
                this.GSCEW_alert(`${behaviour.details.name} required Input ${require} \n PLEASE : \n - download the Input ${require} (https://GSCEW.com/${require}) \n or \n - check the behaviour page (https://github/GSCEW/${behaviour.details.name})`)
            } else { 
                this.INPUTS[require].Dependances.push(behaviour.details.name)
            }
        })
    }
}
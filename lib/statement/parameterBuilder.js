module.exports = function(...values){
    let currentParam;

    if(values.length){
        this.parameters = values;
    }
    else{
        this.parameters = {};
        this.name = newParameter,
        this.value = setValue,
        this.direction = setDirection,
        this.type = setType
    }

    return this;

    function newParameter(name){
        currentParam = name;
        this.parameters[name] = {}
        return this;
    }

    function setValue(value){
        this.parameters[currentParam].val = value;
        return this;
    }

    function setDirection(direction){
        this.parameters[currentParam].dir = direction;
        return this;
    }

    function setType(type){
        this.parameters[currentParam].type = type;
        return this;
    }
}
module.exports = {
    commit,
    roolback,
    done
}

function commit(){
    if(this.connection)
        return this.connection.commit();
}

function roolback(){
    if(this.connection)
        return this.connection.roolback();
}

function done(){
    if(this.connection)
        return this.connection.close();
}
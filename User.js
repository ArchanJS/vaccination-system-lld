class User{
    constructor(_id, _name, _gender, _age, _current_state, _current_district){
        this.name=_name;
        this.gender=_gender;
        this.age=_age;
        this.current_state=_current_state;
        this.district=_current_district;
    }
};

module.exports=User;
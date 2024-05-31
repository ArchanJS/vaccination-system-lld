const User=require('./User');
const Center=require('./Center');
const Capacity=require('./Capacity');
const Booking=require('./Booking');

// defining variables
let users = [];
let centers=[];
let capacities=[];
let bookings=[];
let booking_id=1;

// methods
function addUser(id, name, gender, age, current_state, current_district){
    if(!id || !name || !name.trim() || !gender || !gender.trim() || !age || !current_state || !current_state.trim() || !current_district || !current_district.trim) {
        console.log('Please enter all the details properly');
        return;
    }
    const user=new User(id, name, gender, age, current_state, current_district);
    users.push(user);
    // console.log('users array after adding user',users);
}

function addCenter(state_name, district_name, center_id){
    if(!state_name || !state_name.trim() || !district_name || !district_name.trim() || !center_id) {
        console.log('Please enter all the details properly');
        return;
    }
    const center=new Center(state_name, district_name, center_id);
    centers.push(center);
    // console.log('centers array after adding user',centers);
}

function addCapacity(center_id, day, capacity){
    if(!center_id || !center_id.trim() || !day || !capacity) {
        console.log('Please enter all the details properly');
        return;
    }
    const capacityObj=new Capacity(center_id, day, capacity);
    capacities.push(capacityObj);
    // console.log('capacities array after adding user',capacities);
}

function listCenters(district){
    console.log({district});
    const listOfCenters = centers.filter(center => center.district_name == district);
    console.log(`Centers in the district ${district} are: `, listOfCenters);
}

function bookVaccination(center_id, day, user_id){
    if(!center_id || !center_id.trim() || !day || !user_id || !user_id.trim()) {
        console.log('Please enter all the details properly');
        return;
    }
    const booking=new Booking(center_id,day,user_id, booking_id);
   let capacity=capacities.filter((cap => (cap.day==day && cap.center_id==center_id)));
   capacity=capacity.length==0 ? 0: capacity[0].capacity;
    const bookings_done=bookings.filter((book => {book.day==day && book.center_id==center_id})).length;
    if(capacity==0 || capacity==bookings_done) {
        console.log(`there is no slot to book on ${day}`);
        return;
    }
    bookings.push(booking);
    booking_id++;
    console.log('slot booked succesfully');
}

function listAllBookings(center_id, day){
    if(!center_id || !center_id.trim() || !day) {
        console.log('Please enter all the details properly');
        return;
    }
    const bookinsOnTheDay=bookings.filter((booking => (booking.center_id==center_id && booking.day==day)));
    if (bookinsOnTheDay.length==0) console.log(`there is no booking on ${day} at ${center_id}`);
    else console.log(`Booking on ${day} at the center ${center_id} are: `, bookinsOnTheDay);
}

function cancelBooking(center_id,booking_id,user_id){
    if(!center_id || !center_id.trim() || !booking_id || !user_id) {
        console.log('Please enter all the details properly');
        return;
    }
    console.log(`inside cancel booking `,{center_id, booking_id, user_id});
    bookings=bookings.filter((booking) => {
        if(booking.center_id==center_id && booking.booking_id==booking_id && booking.user_id==user_id) return false;
        return true;
    });
}

function searchCenter(day,district_name){
    if(!day || !district_name || !district_name.trim()) {
        console.log('Please enter all the details properly');
        return;
    }
    const centers=centers.filter((currentCenter => currentCenter.district_name == district_name));
    if(centers.length == 0) {
        console.log('No center available in the city');
        return;
    }
    const center_ids= centers.map((cent => cent.center_id));
    const capacityOnTheDay=capacities.filter((cene))
    const bookinsOnTheDay=bookings.filter((booking => (center_ids.includes(booking.center_id) && booking.day==day)));
    if (bookinsOnTheDay.length==0) console.log(`there is no slot available on ${day} at ${district_name}`);
    else console.log(`Booking on ${day} at the center ${center_id} are: `, bookinsOnTheDay);
}

function runComand(command){
    let info=command.split(' ');
    switch(info[0]){
        case 'ADD_USER':
            addUser(info[1],info[2],info[3],info[4],info[5],info[6]);
            break;
        case 'ADD_VACCINATION_CENTER':
            addCenter(info[1],info[2],info[3]);
            break;
        case 'ADD_CAPACITY':
            addCapacity(info[1],info[2],info[3]);
            break;
        case 'LIST_VACCINATION_CENTERS':
            listCenters(info[1]);
            break;
        case 'BOOK_VACCINATION':
            bookVaccination(info[1],info[2],info[3]);
            break;  
        case 'LIST_ALL_BOOKINGS':
            listAllBookings(info[1],info[2]);
            break; 
        case 'CANCEL_BOOKING':
            cancelBooking(info[1],info[2],info[3]);
            break;
    }
}

function main(){
    runComand('ADD_USER U1 Harry Male 35 Karnataka Bangalore');
    runComand('ADD_USER U2 Ron Male 30 Karnataka Bangalore');
    runComand('ADD_USER U4 Draco Male 15 Karnataka Bangalore');
    runComand('ADD_USER U5 Dobby Male 30 Gujarat Surat');
    runComand('ADD_VACCINATION_CENTER Karnataka Bangalore VC1');
    runComand('ADD_VACCINATION_CENTER Karnataka Bangalore VC2');
    runComand('ADD_VACCINATION_CENTER Karnataka Mysore VC3');
    runComand('ADD_CAPACITY VC1 1 1');
    runComand('ADD_CAPACITY VC2 1 3');
    runComand('ADD_CAPACITY VC1 5 10');
    runComand('ADD_CAPACITY VC3 3 4');
    runComand('LIST_VACCINATION_CENTERS Bangalore');
    runComand('BOOK_VACCINATION VC1 1 U1');
    runComand('BOOK_VACCINATION VC2 1 U2');
    runComand('BOOK_VACCINATION VC2 1 U3');
    runComand('LIST_ALL_BOOKINGS VC2 1');
    runComand('CANCEL_BOOKING VC2 2 U2');
    runComand('LIST_ALL_BOOKINGS VC2 1');
    
    // const user1=new User('U1','Harry','male',35,'Karnataka','Bangalore');
    // const center1=new Center('Karnataka', 'Bangalore', 'VC123')
    // const capacity1=new Capacity('vc123',5,10);
    // console.log(user1,center1,capacity1);
}
main();
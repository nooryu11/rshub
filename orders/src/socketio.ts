export = (io:any) => {
    console.log('IO: ', io);
    io.on("connection", (socket:any) => {
        console.log("New client connected!!");
    })

    // put any other code that wants to use the io variable
    // in here


};
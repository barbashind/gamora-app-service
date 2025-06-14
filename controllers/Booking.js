import Booking from "../models/bookingModel.js";
 
export const getBookingToday = async (req, res) => {
    try {
        const user = req.user;
        const bookings = await Booking.findAll({
            where: {
                companyId: user.companyId
            }
        });
        res.json(bookings);
    } catch (error) {
        res.json({ message: error.message });
    }  
}


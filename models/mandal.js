import mongoose from 'mongoose';

const MandalSchema = new mongoose.Schema({
    mandal_name: String,
    leader_id: String,
    leader_name: String,
    city: String,
    district: String,
    state: String,
    country: String,
    member_count: Number,
    approved: Boolean,
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Mandal = mongoose.model('Mandal', MandalSchema);
export default Mandal
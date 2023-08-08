import Group from "../models/Grupos.model.js";
import Meeti from "../models/Meeti.model.js";
import moment from "moment";

const AdminPanel = async (req, res) => {
  const query = [];
  query.push(Group.find({ _id: { $eq: req.user.id } }));
  query.push(
    Meeti.find({
      _id: { $eq: req.user.id },
      date: { $gte: moment(new Date()).format("YYYY-MM-DD") },
    }).sort({ fecha: "asc" })
  );
  query.push(
    Meeti.find({
      _id: req.user.id,
      date: { $lt: moment(new Date()).format("YYY-MM-DD") },
    })
  );
  const [groups, meeti, previous] = await Promise.all(query);
  res.render('administration', {
    namePage: 'Administration Panel',
    groups,
    meeti,
    previous,
    moment
  })
};

export default AdminPanel;
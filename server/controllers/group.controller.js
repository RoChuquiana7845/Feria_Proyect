import Category from "../models/Categoria.model.js";
import Group from "../models/Grupos.model.js";
import multer from "multer";
import shortid from "shortid";
import fs from "fs";
import uuid from "uuid/v4";

export const configMulter = {
  limits: { fileSize: 100000 },
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, "");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      next(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter(req, file, next) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      next(null, true);
    } else {
      next(new Error("Format invalid", false));
    }
  },
};

const upload = multer(configMulter).single("imagen");

export const uploadImagen = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        if (error.code == 'LIMIT_FILE_SIZE') {
          req.flash("error", 'The file is too heavy');
        } else {
          req.flash("error", error.message);
        }
      } else if (error.hasOwnProperty("message")) {
        req.flash("error", error.message);
      }
      res.redirect("back");
      return;
    } else {
      next();
    }
  });
};

export const formNewGroup = async (req, res) => {
    const category = await Category.find();
    res.render('new-group', {
        namePage: 'Create new group',
        categories: category
    })
}

export const createGroup = async (req, res) => { 
    try { 
        const group = req.body;
        const newGroup = await new Group(group);
        req.flash('success', 'The group was created successfully');
        req.redirect('/administration');
    } catch(error) {
        req.flash('error', error);
        res.redirect('/new-group');
    }
}

export const EditGroup = async (req, res) => {
    const query = [];
    const group = await Group.findOne({_id: req.params.groupId});
    if (!group) { 
        req.flash('error', 'Invalid Operation');
        res.redirect('/log-in');
        return next();
    }

    if(req.file && group.imagen)  {
        const imagenPreviousPath ='';
        fs.unlinkSync(imagenPreviousPath, (error)=> { 
            if (error) { 
                console.error(error);
            }
            return;
        })
    }
    if(req.file) { 
        group.imagen = req.file.filename;
    }

    await group.save();
    req.flash('success', 'Changes saved successfully');
    res.redirect('administration');

}
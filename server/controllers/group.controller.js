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
        req.body.userId = req.user.id;
        if (req.file) { 
            req.body.imagen = req.file.filename;
        }
        req.body.id = uuid();

        const newGroup = await new Group(group);
        req.flash('success', 'The group was created successfully');
        req.redirect('/administration');
    } catch(error) {
        req.flash('error', error);
        res.redirect('/new-group');
    }
}

const formEditGroup = async (req, res) => { 
    const query = [];
    query.push( Group.findById(req.params.groupId));
    query.push( Category.find());

    const [group, category] = await Promise.all(query);
    res.render('edit-group', {
        namePage: `Edited Group: ${group.name}`,
        group,
        category
    })
}

export const EditGroup = async (req, res, next) => { 
    const group = await Group.findOne({_id: req.params.groupId});
    if(!group) { 
        req.flash('error', "Invalid Operation");
        req.redirect('/administration');
        return next();
    }
    const { name, description, categoryId, url} = req.body;
    group.name = name;
    group.description = description;
    group.category = categoryId;
    group.url = url;

    await group.save();
    req.flash('success', "Changes saved successfully");
    res.redirect('/administration');
}

export const formEditImagen = async (req, res) => { 
    const group = await Group.findOne({_id: req.params.groupId, user: req.user.id});
    res.render('imagen-group', { 
        namePage: `Edit Imagen Group: ${group.name}`
    })
}

export const EditImagen = async (req, res) => {
    const query = [];
    const group = await Group.findOne({_id: req.params.groupId, user: req.user.id});
    if (!group) { 
        req.flash('error', 'Invalid Operation');
        res.redirect('/log-in');
        return next();
    }
    if(req.file && group.imagen) {
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

export const formDeleteGroup = async (req, res, next) => { 
    const group = await Group.findOne({_id: req.params.groupId, user: req.user.id});
    if (!group) { 
        req.flash('error', 'Invalid operation');
        req.redirect('/administration');
        return next();
    }
    res.render('delete-group', { 
        namePage: `Deleted Group: ${group.name}`
    })
}

export const DeleteGroup = async (req, res, next) => { 
    const group = await Group.findOne({_id: req.params.groupId, user: req.user.id});
    if(group.imagen) { 
        const imagenPreviousPath = '';
        fs.unlink(imagenPreviousPath, (error) => { 
            if(error) { 
                console.error(error);
            }
            return; 
        });
    }

    await Group.deleteOne({_id: req.params.groupId});
    req.flash("success", "The group has been deleted");
    res.redirect("/administration")
}
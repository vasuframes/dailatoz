const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql   = require('mysql');
const path = require('path');
const multer = require('multer');
const { validate, Joi } = require('express-validation');


var con = mysql.createConnection({
	host: "ec2-44-199-52-133.compute-1.amazonaws.com",
	user: "irnvneypganhgz",
	password: "b59d7c3871ab58c2d38570d73867ae1c4fbc061fe1889a432af02e61563dc085",
	database: "dalk0p6pr2f9ib"
});
  
con.connect(function(err) {
    try{
	    if (err) throw err;
	    console.log("SQL Connected!");
    }
    catch(error){
        console.log("SQL Connection Failed! ");
    }
});

// Creating express object
const app = express();

// Port Number
const PORT = process.env.PORT || 8000;

var router = express.Router();

const imageUpload = multer({
    storage: multer.diskStorage({
        // Destination to store image     
        destination: 'uploads', 
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now() 
                 + path.extname(file.originalname))
        }
    }),
    limits: {
      fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|gif|jpeg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload image files only'))
       }
     cb(undefined, true)
  }
});

router.get('/', function(req, res) {
    res.json({ message: 'welcome to journal api' });
});

/**   Products services */
// get journal information
router.route('/get-journal/:j_code').get(function(req, res) {
    let j_code = req.params.j_code;
    con.query("SELECT * FROM journal_information WHERE journal='"+j_code+"'", function (err, result, fields) {
        try{
            if (err) throw err;
            let out = {"status":'0',"details":result[0]};
            res.json(out);
        }
        catch(error){
            res.json({"status":'1',"description":"Server Failed - Contact Web Team"});
        }
    });
});
// save journal information
router.post('/save-journal', (req, res) => {

       
    validate({body: {
        j_code: Joi.string().regex(/[a-zA-Z]{3,10}/).required()
    }});

    let j_code = mysql.escape(req.body.j_code);
    let journal_name = mysql.escape(req.body.journal_name);
    let journal_type = mysql.escape(req.body.journal_type);
    let journal_issn = mysql.escape(req.body.journal_issn);
    let journal_relkeyword = mysql.escape(req.body.journal_relkeyword);
    let journal_email1 = mysql.escape(req.body.journal_email1);
    let home_url = mysql.escape(req.body.home_url);
    let editorial_url = mysql.escape(req.body.editorial_url);
    let instruct_url = mysql.escape(req.body.instruct_url);
    let submit_man_url = mysql.escape(req.body.submit_man_url);
    let inpress_url = mysql.escape(req.body.inpress_url);
    let archive_url = mysql.escape(req.body.archive_url);
    let current_url = mysql.escape(req.body.current_url);
    let guide_url = mysql.escape(req.body.guide_url);
    let spl_iss_url = mysql.escape(req.body.spl_iss_url);
    let contact_url = mysql.escape(req.body.contact_url);
    let aims_url = mysql.escape(req.body.aims_url);
    let citation_url = mysql.escape(req.body.citation_url);
    let index_url = mysql.escape(req.body.index_url);
    let ethics_url = mysql.escape(req.body.ethics_url);
    let peer_url = mysql.escape(req.body.peer_url);
    let google_scholar_url = mysql.escape(req.body.google_scholar_url);
    let facebook_url = mysql.escape(req.body.facebook_url);
    let twitter_url = mysql.escape(req.body.twitter_url);
    let linked_url = mysql.escape(req.body.linked_url);
    let google_plus_url = mysql.escape(req.body.google_plus_url);

    con.query("SELECT sno FROM journal_information WHERE journal="+j_code, function (err, result) {
        try{
        if (err) throw err;
    if(result.length == 0){

        let insrt_qry = "INSERT INTO journal_information() ?";
        let insrt_values = [];

        con.query(insrt_qry, [insrt_values],function (err, result) {
            if (err) throw err;
            if(result.affectedRows > 0){
                res.json({"status":'0',"description":"Page Saved Successfully"});
            }
            else{
                res.json({"status":'1',"description":"Failed To Save Page"});
            }
        });
    }
    else{
        let sub_qry = "page_heading="+page_title+",page_content="+page_content;
        if(seo_title != '' && seo_title != null){
            sub_qry += ",seo_title="+seo_title;
        }
        if(seo_key != '' && seo_key != null){
            sub_qry += ",seo_key="+seo_key;
        }
        if(seo_desc != '' && seo_desc != null){
            sub_qry += ",seo_desc="+seo_desc;
        }
        let update_qry = "UPDATE journal_information SET "+sub_qry
                        +" WHERE sno="+result[0].sno;
        con.query(update_qry, function (err, result) {
            if (err) throw err;
            if(result.affectedRows > 0){
                res.json({"status":'0',"description":"Page Saved Successfully"});
            }
            else{
                res.json({"status":'1',"description":"Failed To Save Page"});
            }
        });
    }
    }
    catch(error){
        res.json({"status":'1',"description":"Server Failed - Contact Web Team"});
    }
  });
});

// save page content
router.post('/save-page', (req, res) => {

       
        validate({body: {
            j_code: Joi.string().regex(/[a-zA-Z]{3,10}/).required()
        }});

        let j_code = mysql.escape(req.body.j_code);
        let page_type = mysql.escape(req.body.page_type);
        let page_title = mysql.escape(req.body.page_title);
        let page_content = mysql.escape(req.body.page_content);
        let seo_title = mysql.escape(req.body.seo_title);
        let seo_key = mysql.escape(req.body.seo_key);
        let seo_desc = mysql.escape(req.body.seo_desc);

        con.query("SELECT sno FROM page_details WHERE journal="+j_code+" AND page_type="+page_type, function (err, result) {
            try{
			if (err) throw err;
        if(result.length == 0){
            let page_url = req.body.page_url;
            let insrt_qry = "INSERT INTO page_details(journal,page_url,page_type,page_heading,page_content,seo_title,seo_key,seo_desc,date)"
                            +" VALUES("+j_code+","+page_url+","+page_type+","+page_title+","+page_content+","+seo_title+","+seo_key+","+seo_desc+",now())";

            con.query(insrt_qry, function (err, result) {
                if (err) throw err;
                if(result.affectedRows > 0){
                    res.json({"status":'0',"description":"Page Saved Successfully"});
                }
                else{
                    res.json({"status":'1',"description":"Failed To Save Page"});
                }
            });
        }
        else{
            let sub_qry = "page_heading="+page_title+",page_content="+page_content;
            if(seo_title != '' && seo_title != null){
                sub_qry += ",seo_title="+seo_title;
            }
            if(seo_key != '' && seo_key != null){
                sub_qry += ",seo_key="+seo_key;
            }
            if(seo_desc != '' && seo_desc != null){
                sub_qry += ",seo_desc="+seo_desc;
            }
            let update_qry = "UPDATE page_details SET "+sub_qry
                            +" WHERE sno="+result[0].sno;
            con.query(update_qry, function (err, result) {
                if (err) throw err;
                if(result.affectedRows > 0){
                    res.json({"status":'0',"description":"Page Saved Successfully"});
                }
                else{
                    res.json({"status":'1',"description":"Failed To Save Page"});
                }
            });
        }
        }
        catch(error){
            res.json({"status":'1',"description":"Server Failed - Contact Web Team"});
        }
      });
   });



   // update existed product
router.route('/get-page').post(function(req, res) {
    let page_type = req.body.page_type;
    let j_code = req.body.j_code;
    con.query("SELECT * FROM page_details WHERE page_type='"+page_type+"' AND journal='"+j_code+"'", function (err, result) {
        if (err) throw err;
    if(result.length > 0){
        res.json({"status":'0',"details":result[0]});
    }
    else{
        res.json({"status":'1',"description":"No Page"});
    }
  });
});


// update existed product
router.route('/delete-product/:p_id')
.get(function(req, res) {
    let p_id = req.params.p_id;
      con.query("DELETE FROM products WHERE id="+p_id, function (err, result) {
        if (err) throw err;
        if(result.affectedRows > 0){
            res.json({"status":'0',"description":"Product Deleted Successfully"});
        }
        else{
            res.json({"status":'1',"description":"Failed To Delete Product"});
        }
    });
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api', router);

app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('json')) {
      res.json({ error: 'Resource Not found' });
      return;
    }
});
// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));

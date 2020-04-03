var express = require('express');
var router = express.Router();
const axios = require('axios').default;

router.use((req, res, next) => {
   
    if (req.signedCookies.token) {
        req.token = req.signedCookies.token;
        next();
    } else {
        res.redirect("/login");
    }
})

router.get('/', async(req, res) => {
    
    var response = await axios.post("https://api-server-game.herokuapp.com/api/account/profile",
        {}, { headers: { Authorization: `Bearer ${req.token}` } });
        
    if (response) {
        let dataRes =  response.data;
        res.render('admin/index', {title:"admin", layout: 'layouts/_layout', data:dataRes.data_response[0].username});
    }else{
        res.render('admin/index', { title:"admin",layout: 'layouts/_layout',data:"not thing" });
    }  
   
});
router.get('/messenger', async(req,res) =>{
    res.render('adminchat/index',{layout: 'layouts/_layout'});
})

router.use((req, res) => {
    res.render('admin/404', { layout: 'layouts/_layout' });
});
module.exports = router;
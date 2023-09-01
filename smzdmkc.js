const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const https = require('https');

function tuisong(kkk) {
    const timestamp = new Date().getTime();
    const secret = 'SECddd3059de36b8763b641a300321a9c8ab256d7df15ace1e187565afc6540a4ca';
    const stringToSign = `${timestamp}\n${secret}`;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(stringToSign);
    const sign = encodeURIComponent(hmac.digest('base64'));

    const url = `https://oapi.dingtalk.com/robot/send?access_token=264d0b7a853d7ce0e311bc14db6c47058e8b20f71b453ff0d54c39b80c558134&timestamp=${timestamp}&sign=${sign}`;
    
    const msg = {
        msgtype: 'text',
        text: {
            content: kkk
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(data);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(JSON.stringify(msg));
    req.end();
}

// Call the functio

// 随机生成一个 User-Agent
function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    // 添加更多 User-Agent
  ];
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}

// 构造请求头
const headers = {
  'Referer': 'https://zhiyou.m.smzdm.com/user/vip?type=0&zdm_feature=%7B%22sm%22%3A1%2C%22ns%22%3A1%2C%22dc%22%3A%22%2300ffffff%22%2C%22fs%22%3A1%7',
  'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
};

// POST 请求的数据
const postData = {
  // 添加需要的 POST 数据
  'order':'vip',
  'limit':50,
  'offset':0,
  'type_in':5
};

// 发送 POST 请求
axios.post('https://zhiyou.m.smzdm.com//duihuan/good/ajax_get_list', postData, { headers })
  .then(response => {
    var a = ''
    for (var i in response.data.data.list){
      if (response.data.data.list[i].status == 1){
        if(response.data.data.list[i].price_info.deduct_type==1){
          a=a+'金币兑换：'+'\n'+response.data.data.list[i].goods_title+'\n'
          console.log('金币兑换：',response.data.data.list[i].goods_title,'有货')
        }
        else{
          a=a+'碎银兑换：'+'\n'+response.data.data.list[i].goods_title+'\n'
          console.log('碎银兑换：',response.data.data.list[i].goods_title,'有货')
        }
      }
      for (var key1 in response.data.data.list[i]){
      }
      
    }

    //console.log(response.data.data.list[1].goods_title);
    //console.log('响应结果：', response.data);
  tuisong(a+'\n以上兑换物品有库存');
})
  .catch(error => {
    console.error('请求发生错误：', error);
  tuisong(error);
});
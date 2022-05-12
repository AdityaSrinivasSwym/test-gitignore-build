from crypt import methods
from flask import Flask, request
from flask_cors import CORS
import requests
import resource
from flask_restful import Api, Resource

app = Flask(__name__)
CORS(app)

# https://shopify-appdev.swymrelay.com/charges.php?siteurl=<storeurl.myshopify.com>&appname=Wishlist&plan=Enterprise&trial=0&price=9588&isannual=true


@app.route('/generate-payment', methods=['POST'])
def gen_payment():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = request.json
        resp = requests.get('https://shopify-appdev.swymrelay.com/charges.php?siteurl='+str(data.get('m-url')) +
                            '&appname='+str(data.get('app-name'))+'&plan='+str(data.get('plan'))+'&trial='+str(data.get('trial'))+'&price='+str(data.get('price'))+'&isannual='+str(data.get('annual')))
        return resp.json()
    else:
        return "Not found"

        # # Using Flask API
        # api = Api(app)
        # class PaymentAPI(Resource):
        #     def post(self):
        #         content_type = request.headers.get('Content-Type')
        #         if (content_type == 'application/json'):
        #             json = request.json
        #             print(json)
        #             return json
        #         # return {"data": "Posted"}
        #         return "Not found"
        # api.add_resource(PaymentAPI, "/")


if __name__ == "__main__":
    app.run(debug=True)

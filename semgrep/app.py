from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.form['data']
    eval(data)
    return 'ok'

if __name__ == '__main__':
    app.run(debug=True)
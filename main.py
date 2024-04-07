from io import BytesIO
from flask import Flask, send_file, request, send_from_directory
from ves_render import render_image
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

def serve_pil_image(img):
  img_io = BytesIO()
  img.save(img_io, 'PNG', quality=70)
  img_io.seek(0)
  return send_file(img_io, mimetype='image/png')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  if (len(path) == 0):
    return send_from_directory('public', 'index.html')

  return send_from_directory('public', path)

@app.route('/render', methods=['POST'])
def render():
  ves = request.form.get('ves')
  width = request.form.get('width')
  img = render_image(ves, width) 
  return serve_pil_image(img)
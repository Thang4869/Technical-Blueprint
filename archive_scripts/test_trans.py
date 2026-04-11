import urllib.request, urllib.parse, json

def translate(text):
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        res = json.loads(response.read().decode('utf-8'))
        return ''.join([part[0] for part in res[0]])
    except Exception as e:
        return f"Error: {e}"

print(translate('Kiểm tra dịch thuật!'))

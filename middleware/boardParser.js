function boardContentParser(req, res, next) {
  const {body} = req;
  try {
    body.content_json = body.content;
    body.content = textContentExtraction(body.content);
    next();
  }catch(e){
    return res.status(500).json({message:e.message});
  }
}

function textContentExtraction(content) {
  let text= '';
  for(const elem of content){
    if(elem.textContent){
      text+=elem.textContent;
    }
    if(Array.isArray(elem.children) && elem.children.length>0){
      text+=` ${textContentExtraction(elem.children)}`;
    }
  }
  return text;
}

module.exports = {
  boardContentParser
}
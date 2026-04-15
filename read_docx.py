import zipfile
import xml.etree.ElementTree as ET
import sys

def get_docx_text(path):
    with zipfile.ZipFile(path) as docx:
        tree = ET.XML(docx.read('word/document.xml'))
        lines = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
            if texts:
                lines.append(''.join(texts))
        return '\n'.join(lines)

if __name__ == '__main__':
    print(get_docx_text(sys.argv[1]))

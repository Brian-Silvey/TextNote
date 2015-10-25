f = open('noteKey.json', 'w')
f.write('{"notes":[')
freq = '0'
i = 0
currNum = 0
notes = 'cdefgab'
while currNum <= 8:
  currNumString = str(currNum)
  for note in notes:
    if note == 'b' and currNum == 8:
      freq = raw_input('freq of ' + note + '-' + currNumString + ': ')
      f.write('{"note":"' + note + '-' + currNumString + '","freq":' + freq + '}')   
      break
    freq = raw_input('freq of ' + note + '-' + currNumString + ': ')
    f.write('{"note":"' + note + '-' + currNumString + '","freq":' + freq + '},')
    if note == 'c':
      freq = raw_input('freq of ' + note + '^' + currNumString + ' / ' + 'd' + '_' + currNumString + ': ')
      f.write('{"note":"' + note + '^' + currNumString + '","freq":' + freq + '},{"note":"' + 'd' + '_' + currNumString + '","freq":' + freq + '},')
    elif note == 'd':
      freq = raw_input('freq of ' + note + '^' + currNumString + ' / ' + 'e' + '_' + currNumString + ': ')
      f.write('{"note":"' + note + '^' + currNumString + '","freq":' + freq + '},{"note":"' + 'e' + '_' + currNumString + '","freq":' + freq + '},')
    elif note == 'f':
      freq = raw_input('freq of ' + note + '^' + currNumString + ' / ' + 'g' + '_' + currNumString + ': ')
      f.write('{"note":"' + note + '^' + currNumString + '","freq":' + freq + '},{"note":"' + 'g' + '_' + currNumString + '","freq":' + freq + '},')
    elif note == 'g':
      freq = raw_input('freq of ' + note + '^' + currNumString + ' / ' + 'a' + '_' + currNumString + ': ')
      f.write('{"note":"' + note + '^' + currNumString + '","freq":' + freq + '},{"note":"' + 'a' + '_' + currNumString + '","freq":' + freq + '},')
    elif note == 'a':
      freq = raw_input('freq of ' + note + '^' + currNumString + ' / ' + 'b' + '_' + currNumString + ': ')
      f.write('{"note":"' + note + '^' + currNumString + '","freq":' + freq + '},{"note":"' + 'b' + '_' + currNumString + '","freq":' + freq + '},')
  currNum += 1
f.write(']}')
f.close()

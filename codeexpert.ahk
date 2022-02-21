SetTitleMatchMode, 2




#If WinActive("ETH Code Expert")
	; Duplicate
	^q::  
		temp:=clipboard
		send {Home}  ; brings the cursor to the starting of the line
		Sleep 10
		send +{End}  ; selects the entire line
		Sleep 10
		send ^c  ; copies the text
		Sleep 10
		send {End}  ; goes to the end of line
		Sleep 10
		send {Enter}  ; creates a new line
		Sleep 10
		send ^v     ; pastes the text at next line
		clipboard:=temp
		return
		
	;bind these to extra mouse buttons if you have some
	F15::^/
	F16::
		Send, System.out.println();
		Send, {Left}
		Send, {Left}
		return

#If

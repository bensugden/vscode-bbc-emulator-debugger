//import { window, OpenDialogOptions, InputBoxOptions, Uri, workspace, Position } from 'vscode';
import { window, Uri } from 'vscode';
//import * as path from 'path';

export class Disassembler {

    /**
     * Shows an input panel to calculate
     */
    public showInputPanel(isCopper: boolean): Promise<void> {
        return new Promise(async (resolve, reject) => {
         {
             /*
                let address = await window.showInputBox(<InputBoxOptions>{
                    //value: "${COP1LC}",
                    prompt: "Copper address: 1 or 2 or $xxxxxxxx or #{symbol} or ${symbol} "
                });
                if (address !== undefined)
                */
                {
                    // Code to replace #, it is not done by the Uri.parse
                 //   address = address.replace('#', '%23');
                    let filename = "///d:/test.txt";
                    const newFile = Uri.parse(`file:${filename}`);
                    await window.showTextDocument(newFile).then((_) => {
                        resolve();
                    }, err => {
                        let message = err.message;
                        window.showErrorMessage(message);
                        reject(err);
                    });
                }
            }
        });
    }

}

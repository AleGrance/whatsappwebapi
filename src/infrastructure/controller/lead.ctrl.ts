import { Request, Response } from "express";
import { MessageMedia, Client } from "whatsapp-web.js";
import { LeadCreate } from "../../application/lead.create";

class LeadCtrl {
  constructor(private readonly leadCreator: LeadCreate) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    if (body.mimeType === "") {
      const { message, phone } = body;
      const response = await this.leadCreator.sendMessageAndSaveSimple({
        message,
        phone,
      });
      res.send(response);
    } else {
      const message = body.message;
      const phone = body.phone;
      const mimeType = body.mimeType;
      const fileName = body.fileName;
      const fileSize = body.fileSize;
      //const media = await MessageMedia.fromUrl(body.media);
      const media = new MessageMedia(mimeType, body.data, fileName, fileSize);

      const response = await this.leadCreator.sendMessageAndSave({
        message,
        phone,
        media,
      });
      res.send(response);
    }
  };
}

export default LeadCtrl;

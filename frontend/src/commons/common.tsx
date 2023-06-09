import { ICStar } from "@assets/icons/ICStar";
import { Colors } from "@constants/color";

export const renderStar = (rate: number) => {
    let xhtml: any[] = [];

    for (let i = 1; i <= 5; i++) {
      xhtml.push(
        <span key={i}>
          <ICStar color={rate >= i ? Colors.bg_F4A118 : Colors.text_A1A0A3} />
        </span>
      );
    }

    return xhtml;
  };
import { IReportDist } from 'src/api/report';

export const ExportPDF = (titles: string[], dataReport: IReportDist[]) => {

    console.log('dataReport dataReport' , dataReport);

  return `
    <html>
      <head>
        <style>
        .container {
            width: 100%;
        }
          body {
            font-family: 'Times New Roman';
            font-size: 12px;
          }
          .header-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .header-tr {
            background-color: #EA222A;
            color: #fff;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border-width: 1px;
            border-style: solid;
            border-color: transparent transparent #ccc transparent;
            padding: 5px;
          }
          th {
            background-color: #ccc;
          }
          .font-bold {
            font-weight: bold;
          }
          p {
            font-size: 12px
          }
          h2 {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            margin-top: 40px;
            text-transform: uppercase;
          }
          .sub-title {
            font-size: 14px;
            text-align: center;
            margin-top: 16px
          }

          .header {
            display: flex;
            align-items: center;
            grid-column-gap: 25px;
            font-size: 14
          }
          table {
            margin-top: 16px;
          }
          .flex {
            display: flex;
            align-items: center;
          }
        </style>
      </head>
      <body>
          <div class="container">
          <div class="header-info">
          <div class="header">
            <p class="flex">
            <span class="font-bold">Ngày lập: </span> <span>15/06/2023 - 15:00</span>
            </p>
            <p class="flex">
            <span class="font-bold">Người lập: </span> <span>Admin</span>
            </p>
        </div>
          <p class="flex">
            <span class="font-bold">Cơ sở: </span>
            <span>102 Trường Trinh, Phường Mai, Đống Đa, Hà Nội</span>
             </p>
          </div>
          <h2>Báo cáo món ăn Bán - Hủy</h2>
          <p class="sub-title">
          <span class=" font-bold">Ngày: </span>
          <span>Từ 29/06/2023 đến 29/07/2023</span>
        </p>
      <table>
        <tr class="header-tr">
        ${titles
          .map(item => {
            return ` <td>${item}</td>`;
          })
          .join('')} 
        </tr>
        ${dataReport
          .map(
            line => `
          <tr style="background-color: rgba(248, 213, 213, 1)">
            <td>${line.id}</td>
            <td>${line.name}</td>
            <td style="margin-left: 40px">${line.quantitySuccess}</td>
            <td style="margin-left: 40px">${line.quantityCancel}</td>
          </tr>
          ${line.list
            .map(item => {
              const indexValueCheck = item.list ? '#FFDB9E' : '#FFFFFF';
              return `
                <tr style="background-color:  ${indexValueCheck}">
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td style="margin-left: 40px">${item.quantitySuccess}</td>
                <td style="margin-left: 40px">${item.quantityCancel}</td>
              </tr>
              ${item.list
                ?.map(item3 => {
                  return `
                    <tr>
                    <td>${item3.id}</td>
                    <td>${item3.name}</td>
                    <td style="margin-left: 40px">${item.quantitySuccess}</td>
                    <td style="margin-left: 40px">${item.quantityCancel}</td>
                  </tr>
                `;
                })
                .join('')}
            `;
            })
            .join('')}
        `,
          )
          .join('')}
      </table>
          </div>
        
      </body>
    </html>
  `;
};


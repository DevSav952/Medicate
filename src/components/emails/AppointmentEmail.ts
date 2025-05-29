import { AppointmentEmailProps } from '@/interfaces/shared'

export const appointmentEmail = ({
  appointmentId,
  patientName,
  appointmentDate,
  appointmentTime,
  doctorName
}: AppointmentEmailProps) => {
  return `
  <!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <title>Підтвердження запису</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <tr>
              <td style="background-color: #007BFF; padding: 20px; color: #ffffff; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Підтвердження запису на прийом</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; color: #333333;">
                <p style="font-size: 16px;">Шановний(а) <strong>${patientName}</strong>,</p>
                <p style="font-size: 16px;">Ваш візит до лікаря <strong>успішно заплановано!</strong></p>

                <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
                  <tr>
                    <td style="font-size: 15px;"><strong>Дата:</strong></td>
                    <td style="font-size: 15px;">${appointmentDate}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px;"><strong>Час:</strong></td>
                    <td style="font-size: 15px;">${appointmentTime}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px;"><strong>Лікар:</strong></td>
                    <td style="font-size: 15px;">${doctorName}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 15px;"><strong>Адреса:</strong></td>
                    <td style="font-size: 15px;">м. Вінниця, вулиця Келецька, 41</td>
                  </tr>
                </table>

                <p style="font-size: 16px;">
                  Якщо вам потрібно змінити або скасувати запис, натисніть кнопку нижче або зв’яжіться з нами.
                </p>

                <p style="text-align: center; margin: 30px 0;">
                  <a href="https://medicate-densavdevdens-projects.vercel.app/appointments/${appointmentId}" style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                    Переглянути деталі
                  </a>
                </p>

                <p style="font-size: 15px;">Дякуємо, що обрали <strong>BeClinic</strong>. Бажаємо вам міцного здоров’я!</p>

                <p style="font-size: 14px; color: #999999;">З повагою,<br/>Команда BeClinic</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 13px; color: #777777;">
                &copy; 2025 BeClinic. Усі права захищені.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
 `
}

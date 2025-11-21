/**
 * @swagger
 * components:
 *   schemas:
 *     DashboardRange:
 *       type: string
 *       enum: [7d, 30d, 90d]
 *     DashboardIndicator:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: integer
 *         totalFarms:
 *           type: integer
 *         partnerFarms:
 *           type: integer
 *         nonPartnerFarms:
 *           type: integer
 *         activeSessions:
 *           type: integer
 *     DashboardChartPoint:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         farmsCreated:
 *           type: integer
 *     DashboardData:
 *       type: object
 *       properties:
 *         range:
 *           $ref: '#/components/schemas/DashboardRange'
 *         indicators:
 *           $ref: '#/components/schemas/DashboardIndicator'
 *         chart:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardChartPoint'
 *     DashboardResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               $ref: '#/components/schemas/DashboardData'
 */
export const _ = null;

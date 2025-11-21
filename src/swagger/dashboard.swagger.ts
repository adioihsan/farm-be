/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard overview
 */

/**
 * @swagger
 * /v1/dashboard:
 *   get:
 *     summary: Get dashboard data
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: range
 *         required: false
 *         schema:
 *           $ref: '#/components/schemas/DashboardRange'
 *         description: Time range for the dashboard (default is 30d)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardResponse'
 *       500:
 *         description: Failed to fetch dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const _ = null;

import {FieldPacket, QueryResult} from "mysql2";

interface DbMigration {
    up(): Promise<[QueryResult, FieldPacket[]]> | null
    down(): Promise<[QueryResult, FieldPacket[]]> | null
}
export default DbMigration